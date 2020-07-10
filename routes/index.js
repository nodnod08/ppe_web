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

// router.get('/login', routeParse, renderer, async function(req, res) {
// 	res.showView(null, null);
// });

// router.get('/register', routeParse, renderer, async function(req, res) {
// 	res.showView(null, null);
// });

router.get('/products', routeParse, renderer, async function(req, res) {
	const query = req.query;
	const page = Number(query.page);
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
			query,
			current_page: page,
			total_pages: Math.ceil(total / perPage),
		})
	);
});

router.get('/product/:id', routeParse, renderer, async function(req, res) {
	const id = req.params.id;

	const result = await Items.findOne({ _id: id })
		.populate('brand')
		.exec();
	res.showView(
		null,
		JSON.stringify({
			data: result,
		})
	);
});

router.get('/about-us', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/support', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

module.exports = router;
