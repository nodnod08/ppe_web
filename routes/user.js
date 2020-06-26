// MODULES
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// MODELS
const Users = require('./../models/Users');

router.post('/register-admin', async function(req, res) {
	const user_inital = {
		username: req.body.username,
		userType: 1,
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		fullName: `${req.body.firstName} ${req.body.lastName}`,
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
			res.send({
				success: true,
				message: 'Admin successfuly registered',
			});
		});
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

module.exports = router;
