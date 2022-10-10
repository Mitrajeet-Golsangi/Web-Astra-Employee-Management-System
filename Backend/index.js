// import express from 'express';
// import http  from 'http';

// username :- Web_astra
// password :- fVCUzati7TtpNoKF

//username : Flipr_hthon
// password :- kj8fbW6yYC8RJxYB

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Routers
const EmployeeRouter = require('./routes/EmployeeRoutes');
const CompanyRouter = require('./routes/CompanyRoutes');
const UserRouter = require('./routes/UserRoutes');
const TaskRouter = require('./routes/TaskRoutes');

const dbConnect = require('./utils/dbConnect');

dbConnect();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(morgan('dev'));

let session = require('express-session');
let FileStore = require('session-file-store')(session);

app.use(
	session({
		name: 'session-id',
		secret: '12345-67890-09876-54321',
		saveUninitialized: false,
		resave: false,
		store: new FileStore(),
	})
);

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use('/emp', EmployeeRouter);
app.use('/comp', CompanyRouter);
app.use('/user', UserRouter);
app.use('/task', TaskRouter);

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.end('Hello there, Welcome !!!!!!');
});

server.listen(port, () => {
	console.log('listining on server 3000');
});
