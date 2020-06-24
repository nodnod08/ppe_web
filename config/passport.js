const passport = require('passport');
const Users = require('./../models/Users');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			function(username, password, done) {
				console.log(username);
				console.log(password);
				// User.findOne({ username: username }, function(err, user) {
				// 	if (err) {
				// 		return done(err);
				// 	}
				// 	if (!user) {
				// 		return done(null, false, { message: 'Incorrect username.' });
				// 	}
				// 	if (!user.validPassword(password)) {
				// 		return done(null, false, { message: 'Incorrect password.' });
				// 	}
				// 	return done(null, user);
				// });
			}
		)
	);
};
