// MODULES
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// MODELS
const Users = require('./../models/Users');

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

module.exports = router;
