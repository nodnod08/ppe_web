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
const researcher = require('./../middleware/researcher');

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

router.get('/products', researcher, routeParse, renderer, async function(req, res) {
	const query = req.query;
	const page = Number(query.page);
	const perPage = query.perPage || 9;
	const offset = perPage * page - perPage;
	let searches = {};
	let valid = ['category', 'brand_name', 'is_colored', 'item_name'];
	Object.keys(query).map((field) => {
		if (valid.includes(field)) {
			searches[field] = field == 'is_colorred' ? Boolean(query[field]) : query[field];
		}
	});

	let result = [];

	if (query.hasOwnProperty('item_name')) {
		result = await Items.find({ item_name: query.item_name }, null, {
			limit: perPage,
			skip: offset,
		})
			.populate({
				path: 'brand',
			})
			.exec();
	} else {
		result = await Items.find({}, null, { limit: perPage, skip: offset })
			.populate({
				path: 'brand',
				match: { ...searches },
			})
			.exec();
	}

	result = result.filter(function(e) {
		return e.brand != null;
	});

	// const total = await Items.countDocuments();
	res.showView(
		null,
		JSON.stringify({
			total: result.length,
			data: result,
			query,
			current_page: page,
			total_pages: Math.ceil(result.length / perPage),
			// total_pages: Math.ceil(total / perPage),
		})
	);
});

router.get('/product/:id', researcher, routeParse, renderer, async function(req, res) {
	const id = req.params.id;

	const result = await Items.findOne({ _id: id })
		.populate('brand')
		.exec();
	const tot = await Items.countDocuments();
	const all = tot - 4;
	const randoms = await Items.find({ _id: { $ne: id } }, null, {
		limit: 4,
		skip: Math.random(Math.random() * (all - 1 + 1) + 1),
	})
		.populate('brand')
		.exec();

	res.showView(
		null,
		JSON.stringify({
			data: { result, randoms },
		})
	);
});

router.get('/about-us', researcher, routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/support', researcher, routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/terms-and-conditions', researcher, routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

module.exports = router;
