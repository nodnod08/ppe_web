const passport = require('passport');
const bcrypt = require('bcryptjs');
const Users = require('./../models/Users');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	passport.use(
		'local',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			function(username, password, done) {
				Users.findOne({ email: username }, function(err, user) {
					if (user) {
						bcrypt.compare(password, user.password).then((response) => {
							if (response) {
								const current_user = {
									_id: user._id,
									username: user.email,
									email: user.email,
									userType: user.userType,
									firstName: user.firstName,
									lastName: user.lastName,
									fullName: user.fullName,
								};
								return done(null, current_user, 'You can login now');
							} else {
								return done(null, false, 'Incorrect email or password');
							}
						});
					} else if (err) {
						return done(err);
					} else {
						return done(null, false, 'Incorrect email or password');
					}
				});
			}
		)
	);

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		Users.findById(id, function(err, user) {
			const current_user = {
				_id: user._id,
				username: user.email,
				email: user.email,
				userType: user.userType,
				firstName: user.firstName,
				lastName: user.lastName,
				fullName: user.fullName,
			};
			done(err, current_user);
		});
	});
};
