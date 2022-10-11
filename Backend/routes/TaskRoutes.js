const express = require('express');
const Tasks = require('../models/Task');
const bodyParser = require('body-parser');
const Employees = require('../models/Employees');
const Users = require('../models/User');

// Creating a Router for Tasks Operations
const router = express.Router();

//Work in Progress Feature [Authantication]
const isauth = (req, res, next) => {
	if (req.session.email) {
		next();
	} else {
		// res.redirect('/tasks/login');
		res.end('You are not  logged in');
	}
};

//Parsing body of requests to json object
router.use(bodyParser.json());

// Get the data of all the Tasks in database
//[Done]
router.get('/', isauth, (req, res, next) => {
	Tasks.find({})
		.then(
			task => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				console.log(task);
				res.json(task);
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Create an task entry in database with Uinque Email address only....
//[Done]
router.post('/create', async (req, res, next) => {
	const task_type = req.body.task_type;

	const start_time = req.body.start_time;
	const duration = req.body.duration;
	const description = req.body.description;

	const task = await Tasks.create({
		task_type,
		start_time,
		duration,
		description,
	}).catch(err => {
		console.log(err);
	});

	const emp = await Employees.findOneAndUpdate(
		{ user: req.body.id },
		{ $push: { tasks: task._id } },
		{ new: true }
	).catch(err => console.log(err));
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json(task);
});

// Gettinng task data by id
//[Done]
router.get(
	'/:Id',
	isauth,
	(req, res, next) => {
		Tasks.findById(req.params.Id)
			.then(task => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(task);
			})
			.catch(err => next(err));
	},
	err => next(err)
);

// completed successfully
//[Done]
router.put(
	'/:Id',
	isauth,
	(req, res, next) => {
		tasks
			.findByIdAndUpdate(req.params.Id, req.body)
			.then(
				task => {
					// tasks.save();
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({ message: 'task updated successfully', task: task });
				},
				err => next(err)
			)
			.catch(err => next(err));
	},
	err => next(err)
);

// Delete all the Tasks database
//[Done]
router.delete('/', isauth, (req, res, next) => {
	Tasks.remove({})
		.then(
			val => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(val);
				console.log('All data deleted successfully !!!');
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Deleting a task using it's id
//[Done]
router.delete('/:Id', isauth, (req, res, next) => {
	Tasks.deleteOne({ _id: req.params.Id })
		.then(
			resp => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			},
			err => next(err)
		)
		.catch(err => next(err));
});

module.exports = router;
