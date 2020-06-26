// MODULES
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const path = require('path');
const VIEWS = path.join(__dirname, '..', 'src', 'pages');
const axios = require('axios');

//middlewares
const routeParse = require('./../middleware/routeParser');
const renderer = require('./../middleware/viewRenderer');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');
const Items = require('../models/Items');

router.get('/', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/login', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/register', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/products/:page', routeParse, renderer, async function(req, res) {
	const page = req.params.page;
	const query = req.query;
	const perPage = query.perPage || 9;
	const offset = perPage * page - perPage;

	const result = await Items.find({}, null, { limit: perPage, skip: offset })
		.populate('brand')
		.exec();

	const total = await Items.countDocuments();
	res.showView(
		null,
		JSON.stringify({
			total,
			data: result,
			current_page: page,
			total_pages: Math.ceil(total / perPage),
		})
	);
});

module.exports = router;
