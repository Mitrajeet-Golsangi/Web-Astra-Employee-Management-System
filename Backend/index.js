// import express from 'express';
// import http  from 'http';

// username :- Web_astra
// password :- fVCUzati7TtpNoKF

//username : Flipr_hthon
// password :- kj8fbW6yYC8RJxYB

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const EmployeeRouter = require("./routes/EmployeeRoutes");
const Employees = require("./models/Employees");

const dbConnect = require("./utils/dbConnect");

dbConnect();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/emp", EmployeeRouter);

app.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.end("Hello there, Welcome !!!!!!");
});

server.listen(3000, () => {
	console.log("listining on server 3000");
});
