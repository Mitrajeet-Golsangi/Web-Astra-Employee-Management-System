
const express = require('express');
const Employees = require('../models/Employees');
const bodyParser = require('body-parser');


// Creating a Router for Employees Operations
const router = express.Router();

//Parsing body of requests to json object
router.use(bodyParser.json());

// Get the data of all the employees in database
//[Done]
router.get('/',(req,res,next)=>{

    Employees.find({})
    .then((employees)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        console.log(employees);
        res.json(employees);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

// Create an employee entry in database with Uinque Email address only....
//[Done]
router.post('/',(req,res,next)=>{
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contact_no = req.body.contact_no;
    const department = req.body.department;
    const Joining_date = Date();
    const password = req.body.password;

    Employees.findOne({email})
    .then((employee)=>{
        if(employee){
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({message :  `User with ${email} exists in the database, go to login section.`})
            console.log("User Exists Already !!!!")
        }else{
            Employees.create({fname,lname,contact_no,department,Joining_date,email,password})
            .then((employee)=>{
                console.log(employee);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(employee);
            },(err)=>next(err))
            .catch((err)=>{
                console.log(err);
            });
        }
    })
    .catch((err)=>next(err));

});


//Gettinng employee by id
// router.get('/:Id',(req, res, next) => {
//     Employees.findById(req.params.Id)
//         .then((user) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(user);
//         })
//         .catch((err) => next(err));
// }, (err) => next(err));

// // completed successfully   
// UserRouter.put('/:Id',isauth, (req, res, next) => {
//     Users.findByIdAndUpdate(req.params.Id, req.body)
//         .then((user) => {
//             // Users.save();
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({ message: "User updated successfully", user: user });
//         }, (err) => next(err))
//         .catch((err) => next(err));
// }, (err) => next(err));



//[Done]
// Delete all the employees database
router.delete('/',(req,res,next)=>{
    Employees.remove({})
    .then((val)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
        console.log("All data deleted successfully !!!");
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = router;