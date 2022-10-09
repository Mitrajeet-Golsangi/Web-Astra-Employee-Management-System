
const express = require('express');
const Companies = require('../models/Company');
const bodyParser = require('body-parser');
const Users = require('../models/User');

// Creating a Router for Companies Operations
const router = express.Router();

//Work in Progress Feature [Authantication]
const  isauth = (req,res,next)=>{
    if(req.session.email){
        next();
    }else{
        // res.redirect('/companys/login');
        res.end("You are not  logged in");
    }
}

//Parsing body of requests to json object
router.use(bodyParser.json());

// Get the data of all the Companies in database
//[Done]
router.get('/',isauth,(req,res,next)=>{

    Companies.find({})
    .populate('poc')
    .then((company)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        console.log(company);
        res.json(company);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

// Create an company entry in database with Uinque Email address only....
//[Done]
router.post('/signup',(req,res,next)=>{
	const name = req.body.name;
	const departments = req.body.departments;
	const address = req.body.address;
	const poc = req.body.poc;

	Companies.findOne({ name })
		.then(company => {
			if (company) {
				res.statusCode = 400;
				res.setHeader('Content-Type', 'application/json');
				res.json({
					message: `company with ${name} exists in the database, go to login section.`,
				});
				console.log('company Exists Already !!!!');
			} else {
				Companies.create({ name, departments, address, poc })
					.then(
						(company) => {
							console.log(company);
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
                            const comp_id = company._id;
							for (let i = 0; i < company.poc.length; i++) {
								Users.findByIdAndUpdate(company.poc[i], { is_admin: true,company:comp_id})
									.then(
										(val) => {
                                            console.log(comp_id);
											console.log(val);
										},
										err => next(err)
									)
									.catch(err => console.log(err));
							}
							res.json(company);
						},
						err => next(err)
					)
					.catch(err => {
						console.log(err);
					});
			}
		})
		.catch(err => next(err));
});

//longging in if not 
//[Done]
router.post('/login',(req, res, next) => {
    if(req.session.email){
        res.setHeader('Content-Type', 'text/html');
        console.log("Your are already logged in!!") ;
        res.redirect('/');
    }
    Companies.findOne({ email: req.body.email })
        .then((company) => {

            if (company != null) {
                
                if (company.password === req.body.password) {
                    req.session.email = req.body.email;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', ' application/json');
                    // res.json({success: true,message:"Welcome, Your are successfully loged in !!!!!"});
                    // res.redirect('/');
                    req.session.regenerate(function (err) {
                        if (err) next(err)
                    
                        // store company information in session, typically a company id
                        req.session.email = req.body.email
                    
                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                          if (err) return next(err)
                          res.redirect('/')
                        })
                      })


                } else {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: `${req.body.password} is wrong password` });
                }
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, message: `company with email ${req.body.email} does not exist !!!!` });
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

// Gettinng company data by id
//[Done]
router.get('/:Id',isauth,(req, res, next) => {
    Companies.findById(req.params.Id)
        .populate('user')
        .then((company) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(company);
        })
        .catch((err) => next(err));
}, (err) => next(err));


// completed successfully
//[Done]   
router.put('/:Id',isauth, (req, res, next) => {
    Companies.findByIdAndUpdate(req.params.Id, req.body)
        .then((company) => {
            // companys.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "company updated successfully", company: company });
        }, (err) => next(err))
        .catch((err) => next(err));
}, (err) => next(err));


// Delete all the Companies database
//[Done]
router.delete('/',isauth,(req,res,next)=>{
    Companies.remove({})
    .then((val)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
        console.log("All data deleted successfully !!!");
    },(err)=>next(err))
    .catch((err)=>next(err));
})


// Deleting a company using it's id
//[Done]
router.delete('/:Id', isauth,(req, res, next) => {
    Companies.deleteOne({ "_id": req.params.Id })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        }, (err) => next(err))
        .catch((err) => next(err));
});


router.post('/emplist',(req,res,next)=>{
    
    // Pass elist array from body (Instrudtion to frontend)
    const elist = req.body.elist;
    const admin_email =  req.session.email;

    Users.findOne({email:admin_email})
    .then((user)=>{
        const admin_comp = user.company;
        for(let i=0; i<elist.length; i++){
    
            Users.findOneAndUpdate({email:elist[i]},{company:admin_comp})
            .then((user2)=>{
                console.log(`Company name = ${admin_comp} added for email = ${user2.email}`); 
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    },(err)=>next(err))
    .catch((err) => next(err));


})
module.exports = router;