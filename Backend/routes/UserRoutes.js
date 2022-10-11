const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/User');
const bodyParser = require('body-parser');
const session = require('express-session');
const { info } = require('console');
const { json } = require('body-parser');
const { resolveSoa } = require('dns');
const FileStore = require('session-file-store')(session);
const mail = require('../utils/mail');
const nodemailer = require('nodemailer');
//email validation
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
	return emailValidator.validate(email);
}

const rand = Math.floor(Math.random() * 100 + 54);

// return res.status(400).send({
//   message: "Please provide a valid email address.",
//   reason: validators[reason].reason
// })

const router = express.Router();

// Work in Progress feature [Authantication]
const isauth = (req, res, next) => {
	if (req.session.email) {
		next();
	} else {
		// res.redirect('/users/login');
		// res.end("You are not logged in !!!!\nGo and log in first ");
		// res.statusCode = 403;
		next();
	}
};

router.use(bodyParser.json());

//Get all the Users
// completed successfully
router.get('/', (req, res, next) => {
	Users.find({})
		.populate('company')
		.then(
			users => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(users);
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Create a new user
// completed partially
let uid;
router.post('/signup', (req, res, next) => {
	Users.findOne({ email: req.body.email })
		.then(
			user => {
				if (user != null) {
					res.statusCode = 400;
					// res.setHeader('Content-Type', 'application/json');
					res.json({
						success: false,
						message: `User with emailid ${user.email} already exists`,
					});
				} else {
					// try mail send
					// const rand = Math.floor((Math.random() * 100) + 54);
					// const host = req.get('host');
					// let link = '';
					Users.create(req.body)
						.then(
							newuser => {
								res.statusCode = 200;
								// res.setHeader('Content-Type', ' application/json');
								res.json({
									success: true,
									message: 'User Registered',
									user: newuser,
								});
								const link =
									'http://' +
									req.get('host') +
									'/user/verify?id=' +
									newuser._id;
								uid = newuser.uid;
								mail(req.body.email, link)
									.then(reqp => {
										console.log('Mail is success');
									})
									.catch(err => {
										console.log(err);
										res.json('Please provide valid email address');
										next(err);
									});
							},
							err => next(err)
						)
						.catch(err => next(err));
				}
			},
			err => next(err)
		)
		.catch(err => next(err));
});

// Login and save session cookie
// completed partially
router.post('/login', async (req, res, next) => {
	const user = await Users.findOne({ email: req.body.email }).catch(err =>
		next(err)
	);

	if (req.session.email) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.send(user);
	} else {
		if (user != null) {
			if (user.password === req.body.password) {
				req.session.email = req.body.email;
				// res.setHeader('Content-Type', ' application/json');
				res.statusCode = 200;
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
						res.send(user);
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
	}
});

// No use function just for testing purposes
// completed successfully
router.get('/login', (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ message: 'Bro you need to login post' });
});

// Logging out the user completed
// completed successfully
router.get('/logout', (req, res, next) => {
	if (req.session.email) {
		const e = req.session.email;
		req.session.destroy();
		res.clearCookie('session-id');
		res.status = 200;
		console.log(`${e} Logged out !!!!`);
		res.setHeader('Content-Type', 'application/json');
		res.json({ message: `${e} logged out !!!` });
	} else {
		var err = new Error('You are not logged in!');
		err.status = 403;
		res.setHeader('Content-Type', 'application/json');
		res.json({ err, message: 'Your are not logged in' });
	}
});

// Create the user with Id
// completed successfully
router.get(
	'/:Id',
	(req, res, next) => {
		Users.findById({ _id: req.params.Id })
			.then(user => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(user);
			})
			.catch(err => next(err));
	},
	err => next(err)
);

//Changing User Data
// completed successfully
router.put(
	'/:Id',
	isauth,
	(req, res, next) => {
		const email = req.body.email;

		if (email) {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			res.json({ message: 'You cannot change your email !!!' });
		} else {
			Users.findByIdAndUpdate(req.params.Id, req.body)
				.then(
					user => {
						// Users.save();
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json({ message: 'User updated successfully', user: user });
					},
					err => next(err)
				)
				.catch(err => next(err));
		}
	},
	err => next(err)
);

// Deleting all the users int the database
// partial completed
router.delete('/', isauth, (req, res, next) => {
	Users.remove({})
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

// Deleting a perticual user from theh database
// complited successfull !!
router.delete('/:Id', isauth, (req, res, next) => {
	Users.deleteOne({ _id: req.params.Id })
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

router.post('/email', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	mail('pravin.harne20@vit.edu')
		.then(reqp => {
			console.log('Mail is success');
			res.json(reqp);
		})
		.catch(err => {
			console.log(err);
			next(err);
			res.json('Please provide valid email address');
		});
});

router.get('/verify', (req, res) => {
	const host = req.get('host');

	console.log(req.protocol + ':/' + req.get('host'));

	res.setHeader('Content-Type', 'application/json');
	if (req.protocol + '://' + req.get('host') == 'http://' + host) {
		console.log('Domain is matched. Information is from Authentic email');
		if (req.query.id == rand) {
			res.statusCode = 200;
			console.log('email is verified');
			res.end('Email  is been Successfully verified');
		} else {
			console.log('email is not verified');
			res.end('Bad Request');
		}
	} else {
		res.end('Request is from unknown source');
	}
});

module.exports = router;
