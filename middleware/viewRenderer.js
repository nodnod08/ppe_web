const path = require('path');
const VIEWS = path.join(__dirname, '..', 'src', 'pages');

const renderer = function(req, res, next) {
	res.showView = (route, data) => {
		// res.render(VIEWS + '/index', {
		// 	location: route == null ? req.page_location : route,
		// 	isAuthenticated: req.isAuthenticated(),
		// 	user_credentials: req.user,
		// 	data,
		// });
		res.redirect('/register');
	};
	next();
};

module.exports = renderer;
