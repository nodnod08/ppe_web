const path = require('path');
const VIEWS = path.join(__dirname, '..', 'src', 'pages');

const renderer = function(req, res, next) {
	res.showView = (route, data) => {
		if (req.page_location == 'login' || req.page_location == 'register') {
			if (req.isAuthenticated) {
				res.redirect('/');
			} else {
				res.render(VIEWS + '/index', {
					location: route == null ? req.page_location : route,
					isAuthenticated: req.isAuthenticated(),
					user_credentials: req.user,
					data,
				});
			}
		} else {
			res.render(VIEWS + '/index', {
				location: route == null ? req.page_location : route,
				isAuthenticated: req.isAuthenticated(),
				user_credentials: req.user,
				data,
			});
		}
	};
	next();
};

module.exports = renderer;
