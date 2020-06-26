const routeParse = function(req, res, next) {
	if (req.route.path == '/') {
		req.page_location = 'index';
	} else {
		req.page_location = req.route.path.split('/')[1];
	}
	next();
};

module.exports = routeParse;
