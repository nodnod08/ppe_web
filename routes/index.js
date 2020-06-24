// MODULES
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const path = require('path');
const VIEWS = path.join(__dirname, '..', 'src', 'pages');

//middlewares
const routeParse = require('./../middleware/routeParser');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');

router.get('/', routeParse, async function(req, res) {
	console.log(req.page_location);
	res.render(VIEWS + '/index', {
		location: req.page_location,
	});
});

router.get('/login', routeParse, async function(req, res) {
	res.render(VIEWS + '/index', {
		location: req.page_location,
	});
});

router.get('/register', routeParse, async function(req, res) {
	res.render(VIEWS + '/index', {
		location: req.page_location,
	});
});

module.exports = router;
