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
const renderer = require('./../middleware/viewRenderer');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');

router.get('/', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/login', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

router.get('/register', routeParse, renderer, async function(req, res) {
	res.showView(null, null);
});

module.exports = router;
