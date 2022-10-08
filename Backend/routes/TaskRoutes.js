
const express = require('express');
const Tasks = require('../models/Task');
const bodyParser = require('body-parser');


// Creating a Router for Tasks Operations
const router = express.Router();

//Work in Progress Feature [Authantication]
const  isauth = (req,res,next)=>{
    if(req.session.email){
        next();
    }else{
        // res.redirect('/tasks/login');
        res.end("You are not  logged in");
    }
}

//Parsing body of requests to json object
router.use(bodyParser.json());

// Get the data of all the Tasks in database
//[Done]
router.get('/',(req,res,next)=>{

    Tasks.find({})
    .then((task)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        console.log(task);
        res.json(task);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

// Create an task entry in database with Uinque Email address only....
//[Done]
router.post('/signup',(req,res,next)=>{
    
    const task_type = req.body.task_type;
    // const start_time = req.body.start_time;
    const start_time = Date();
    const duration = req.body.duration;
    
    Tasks.create({task_type,start_time,duration})
    .then((task)=>{
        console.log(task);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(task);
    },(err)=>next(err))
    .catch((err)=>{
        console.log(err);
    });

});

//longging in if not 
//[Done]
// Loging functionality not needed
// router.post('/login', (req, res, next) => {
//     if(req.session.email){
//         res.setHeader('Content-Type', 'text/html');
//         console.log("Your are already logged in!!") ;
//         res.redirect('/');
//     }
//     Tasks.findOne({ email: req.body.email })
//         .then((task) => {

//             if (task != null) {
                
//                 if (task.password === req.body.password) {
//                     req.session.email = req.body.email;
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', ' application/json');
//                     // res.json({success: true,message:"Welcome, Your are successfully loged in !!!!!"});
//                     // res.redirect('/');
//                     req.session.regenerate(function (err) {
//                         if (err) next(err)
                    
//                         // store task information in session, typically a task id
//                         req.session.email = req.body.email
                    
//                         // save the session before redirection to ensure page
//                         // load does not happen before session is saved
//                         req.session.save(function (err) {
//                           if (err) return next(err)
//                           res.redirect('/')
//                         })
//                       })


//                 } else {
//                     res.statusCode = 403;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json({ success: false, message: `${req.body.password} is wrong password` });
//                 }
//             } else {
//                 res.statusCode = 404;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({ success: false, message: `task with email ${req.body.email} does not exist !!!!` });
//             }
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

// Gettinng task data by id
//[Done]
router.get('/:Id',(req, res, next) => {
    Tasks.findById(req.params.Id)
        .then((task) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(task);
        })
        .catch((err) => next(err));
}, (err) => next(err));


// completed successfully
//[Done]   
router.put('/:Id', (req, res, next) => {
    tasks.findByIdAndUpdate(req.params.Id, req.body)
        .then((task) => {
            // tasks.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "task updated successfully", task: task });
        }, (err) => next(err))
        .catch((err) => next(err));
}, (err) => next(err));


// Delete all the Tasks database
//[Done]
router.delete('/',(req,res,next)=>{
    Tasks.remove({})
    .then((val)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(val);
        console.log("All data deleted successfully !!!");
    },(err)=>next(err))
    .catch((err)=>next(err));
})


// Deleting a task using it's id
//[Done]
router.delete('/:Id', (req, res, next) => {
    Tasks.deleteOne({ "_id": req.params.Id })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = router;