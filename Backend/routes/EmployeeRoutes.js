const express = require('express');
const Employees = require('../models/Employees');
const bodyParser = require('body-parser');
const Users = require('../models/User');
const Tasks = require('../models/Task');
const { info } = require('console');

// Creating a Router for Employees Operations
const router = express.Router();

//Authantication for login
const isauth = (req, res, next) => {
	if (req.session.email) {
		next();
	} else {
		// res.redirect('/users/login');
		res.end('You are not  logged in');
	}
};

//Parsing body of requests to json object
router.use(bodyParser.json());

// Get the data of all the employees in database
//[Done]
router.get('/', isauth, (req, res, next) => {
	Employees.find({})
		.populate('user')
		.populate('company')
		.populate('tasks')
		.then(
			employees => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				console.log(employees);
				res.json(employees);
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Create an employee entry in database with Uinque Email address only....
//[Not Done]
router.post('/signup', (req, res, next) => {
	const user = req.body.user;
	const company = req.body.company;
	const department_name = req.body.department_name;
	const joining_date = Date();
	const tasks = req.body.tasks;

	Users.findById(user)
		.then(
			user => {
				if (user) {
					Employees.create({
						user,
						company,
						department_name,
						joining_date,
						tasks,
					})
						.then(
							employee => {
								res.statusCode = 200;
								res.setHeader('Content-Type', 'application/json');
								res.json(employee);
							},
							err => next(err)
						)
						.catch(err => next(err));
				} else {
					res.statusCode = 404;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						success: false,
						message: 'User not found !!!\n Please create a user first',
					});
				}
			},
			err => next(err)
		)
		.catch(err => next(err));
});

//longging in if not
//[Done]
router.post('/login', (req, res, next) => {
	if (req.session.email) {
		res.setHeader('Content-Type', 'application/json');
		console.log('Your are already logged in!!');
		res.json({ message: 'Already Logged In !' });
	}
	Users.findOne({ email: req.body.email })
		.then(
			user => {
				if (user != null) {
					if (user.password === req.body.password) {
						req.session.email = req.body.email;
						res.statusCode = 200;
						res.setHeader('Content-Type', ' application/json');
						// res.json({success: true,message:"Welcome, Your are successfully loged in !!!!!"});
						// res.redirect('/');
						req.session.regenerate(function (err) {
							if (err) next(err);

							// store user information in session, typically a user id
							req.session.email = req.body.email;

							// save the session before redirection to ensure page
							// load does not happen before session is saved
							req.session.save(function (err) {
								if (err) return next(err);
								res.redirect('/');
							});
						});
					} else {
						res.statusCode = 403;
						res.setHeader('Content-Type', 'application/json');
						res.json({
							success: false,
							message: `${req.body.password} is wrong password`,
						});
					}
				} else {
					res.statusCode = 404;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						success: false,
						message: `User with email ${req.body.email} does not exist !!!!`,
					});
				}
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Gettinng employee by id
//[Done]
router.get(
	'/:Id',
	isauth,
	(req, res, next) => {
		Employees.findById(req.params.Id)
			.populate('user')
			.populate('company')
			.populate('tasks')
			.then(employee => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(employee);
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
		Users.findByIdAndUpdate(req.params.Id, req.body)
			.then(
				employee => {
					// Users.save();
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						message: 'User updated successfully',
						employee: employee,
					});
				},
				err => next(err)
			)
			.catch(err => next(err));
	},
	err => next(err)
);

//[Done]
// Delete all the employees database
router.delete('/', isauth, (req, res, next) => {
	Employees.remove({})
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

// Deleting a Employee using it's id
//[Done]
router.delete('/:Id', isauth, (req, res, next) => {
	Employees.deleteOne({ _id: req.params.Id })
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

/*
Returns an Json Object with the tasks data of that employee for a week...
Takes employee_id as an body:parameter..

*/

router.post('/tasksdata', (req, res, next) => {
	let w = [0, 0, 0, 0, 0, 0, 0, 0];
	let b = [0, 0, 0, 0, 0, 0, 0, 0];
	let m = [0, 0, 0, 0, 0, 0, 0, 0];

	let d = new Date();

	let data = [];

	Employees.findOne({ user: req.body.id })
		.populate('tasks')
		.then(employee => {
			let t = employee.tasks;
			let n = t.length;
			for (let i = 0; i < n; i++) {
				let task_date = new Date(t[i].start_time.split('T')[0]);
				let cd = d.getDate() - task_date.getDate();
				if (cd <= 7) {
					if (t[i].task_type.toLowerCase() === 'work') {
						w[cd] = w[cd] + t[i].duration;
					} else if (t[i].task_type.toLowerCase() === 'break') {
						b[cd] = b[cd] + t[i].duration;
					} else {
						m[cd] = m[cd] + t[i].duration;
					}
				}
			}
						for (let i = 0; i < 7; i++) {
							data.push({
								work: w[i],
								break: b[i],
								meeting: m[i],
							});
						}
			res.status = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({ data: data });
		})
		.catch(err => {
			res.status = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ data: data });
			next(err);
		});
});

module.exports = router;
