const passport = require('passport');
const bcrypt = require('bcryptjs');
const Users = require('./../models/Users');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

	passport.use(
		'google',
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL,
			},
			function(accessToken, refreshToken, profile, cb) {
				// User.findOrCreate({ googleId: profile.id }, function(err, user) {
				// 	return cb(err, user);
				// });
				Users.findOne({ google_id: profile.id }, function(err, user) {
					if (user) {
						const current_user = {
							_id: user._id,
							username: user.email,
							email: user.email,
							userType: user.userType,
							firstName: user.firstName,
							lastName: user.lastName,
							fullName: user.fullName,
						};
						return cb(null, current_user, 'You can login now');
					} else if (err) {
						return cb(err);
					} else {
						const user_inital = {
							google_id: profile.id,
							username: profile.displayName,
							userType: 2,
							email: profile._json.email,
							firstName: profile._json.given_name,
							lastName: profile._json.family_name,
							fullName: `${profile._json.given_name} ${profile._json.family_name}`,
							password: 'default',
							added_by: 'Google Login',
						};

						const new_user = new Users(user_inital);
						new_user.save().then((result) => {
							return cb(null, result, 'You can login now');
						});
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
