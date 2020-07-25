const Items = require('./../models/Items');

const researcher = async function(req, res, next) {
	// let results = Array();
	// Items.find({}).then((result) => {
	// 	results.push(result);
	// 	req.researcher = results;
	// });

	next();
};

module.exports = researcher;
