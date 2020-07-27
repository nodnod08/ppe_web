// MODULES
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const nodemailer = require('nodemailer');

// MODELS
const Users = require('./../models/Users');
const Subscription = require('./../models/Subscription');

router.post('/update-create', async function(req, res) {
	const user_inital = {
		username: req.body.username,
		userType: 1,
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		fullName: `${req.body.firstName} ${req.body.lastName}`,
		added_by: req.body.added_by,
	};

	function password_hasher(password, callback) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, async function(err, hash) {
				callback(err, hash);
			});
		});
	}

	password_hasher(req.body.password, (err, hash) => {
		user_inital.password = hash;
		if (req.body.type == 'create') {
			const new_user = new Users(user_inital);
			new_user.save().then((result) => {
				res.send({
					result: 'success',
					success: true,
					added: result,
					message: 'Admin successfuly registered',
				});
			});
		} else {
			delete user_inital.added_by;
			Users.updateOne({ _id: req.body.old_user._id }, user_inital).then(() => {
				res.send({
					result: 'success',
					success: true,
					message: 'User has been updated',
				});
			});
		}
	});
});

router.post('/register-user', function(req, res) {
	const user_inital = {
		username: req.body.username,
		userType: 2,
		email: req.body.email,
		firstName: req.body.first_name,
		lastName: req.body.last_name,
		fullName: `${req.body.first_name} ${req.body.last_name}`,
		added_by: 'Via Registration',
	};
	function password_hasher(password, callback) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, async function(err, hash) {
				callback(err, hash);
			});
		});
	}

	password_hasher(req.body.password, (err, hash) => {
		user_inital.password = hash;
		const new_user = new Users(user_inital);
		new_user.save().then((result) => {
			passport.authenticate('local')(req, res, function() {});
		});
	});
});

router.post('/login-admin', function(req, res) {
	Users.findOne({ email: req.body.email }).then((result) => {
		if (result) {
			bcrypt.compare(req.body.password, result.password).then((response) => {
				if (response) {
					function JWT_registered(person, callback) {
						let person_new = _.omit(person.toObject(), ['password']);
						jwt.sign(
							{
								data: person_new,
							},
							process.env.SECRET_KEY,
							{ expiresIn: '12h' },
							function(err, token) {
								delete person_new.password;
								callback(err, token, person_new);
							}
						);
					}

					JWT_registered(result, (err, token, result_no_password) => {
						res.send({
							success: true,
							data: {
								token,
								user_credentials: result_no_password,
							},
							message: 'Successfuly logged in',
						});
					});
				} else {
					res.send({
						success: false,
						data: null,
						message: 'Incorrect email or password',
					});
				}
			});
		} else {
			res.send({
				success: false,
				data: null,
				message: 'Incorrect email or password',
			});
		}
	});
});

router.post('/login-user', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (!user) {
			res.send({
				success: false,
				message: info,
			});
		} else {
			req.login(user, function(err) {
				if (err) {
					res.send({
						success: false,
						message: err.message,
					});
				} else {
					res.send({
						success: true,
					});
				}
			});
		}
	})(req, res, next);
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/get-users/:page/:rowsPerPage', async function(req, res) {
	const pageUrl = Number(req.params.page) || 1;
	const perPage = Number(req.params.rowsPerPage) || 10;
	const offset = perPage * pageUrl - perPage;

	const result = await Users.find({}, null, { limit: perPage, skip: offset });

	const total = await Users.countDocuments();

	res.send({
		total,
		data: result,
		current_page: pageUrl,
		total_pages: Math.ceil(total / perPage),
	});
});

router.post('/delete-user', async function(req, res) {
	await Users.find({ _id: req.body.idToDelete }).deleteOne();

	res.send({
		success: true,
		message: 'User has been deleted',
	});
});

router.post('/change-pass', async function(req, res) {
	Users.findOne({ _id: req.body.old_user._id, email: req.body.old_user.email }).then((result) => {
		bcrypt.compare(req.body.opassword, result.password).then((response) => {
			if (response) {
				function password_hasher(password, callback) {
					bcrypt.genSalt(10, function(err, salt) {
						bcrypt.hash(password, salt, async function(err, hash) {
							callback(err, hash);
						});
					});
				}

				password_hasher(req.body.npassword, (err, hash) => {
					Users.updateOne(
						{ _id: req.body.old_user._id, email: req.body.old_user.email },
						{ password: hash }
					).then(() => {
						res.send({
							result: 'success',
							success: true,
							message: 'User has been updated',
						});
					});
				});
			} else {
				res.send({
					success: false,
					result: 'error',
					message: 'Old password is incorrect',
				});
			}
		});
	});
});

router.post('/support-email', async function(req, res) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: process.env.MAIL_PORT,
		secure: process.env.IS_SECURE == 'true' ? true : false,
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASS,
		},
	});
	let message = req.body.message + `\n\n\nRegards,\n${req.body.name}\n${req.body.email}`;
	if (req.body.comany != '') {
		message = message + `\nFrom Company: ${req.body.company}`;
	}
	let info = await transporter.sendMail(
		{
			from: `${req.body.name} <${req.body.email}>`, // sender address
			to: process.env.COMPANY_EMAIL, // list of receivers
			subject: 'Email From Support And Help Page', // Subject line
			text: message,
		},
		(error, result) => {
			if (error) {
				res.send({
					success: false,
					type: 'error',
					message: 'Your message did not send, try again',
				});
			} else {
				res.send({
					success: true,
					type: 'success',
					message: 'Your message has been sent, we will respond as fast as we can Thank you',
				});
			}
		}
	);
});

router.post('/request-email', async function(req, res) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: process.env.MAIL_PORT,
		secure: process.env.IS_SECURE == 'true' ? true : false,
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASS,
		},
	});
	let message = `Hello,\n\nThis email is from your website which has a request for ${req.body.type}\n\nThe Key Number is "${req.body.key_number}"\n\nThank you.`;
	let info = await transporter.sendMail(
		{
			from: `${req.body.name} <${req.body.email}>`, // sender address
			to: process.env.COMPANY_EMAIL, // list of receivers
			subject: 'Email From Warranties And Details Of Support Page', // Subject line
			text: message,
		},
		(error, result) => {
			if (error) {
				res.send({
					success: false,
					type: 'error',
					message: 'Your request did not send, try again',
				});
			} else {
				res.send({
					success: true,
					type: 'success',
					message: 'Your request has been sent, we will respond as fast as we can. Thank you',
				});
			}
		}
	);
});

router.post('/subscribe-email', async function(req, res) {
	Subscription.create({
		email: req.body.email
	}).then(() => {
		res.send({
			success: true,
			type: 'success',
			message: 'Thank you for subscribing. We will update you everytime our store has a promotions, sales and updates.',
		});
	})
})

module.exports = router;
