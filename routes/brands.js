// MODULES
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');

router.post('/add-brand', async function(req, res) {
	var factory = {
		Printer_Brands: Printer_Brands,
		Cartridge_Brands: Cartridge_Brands,
	};
	const brand = new factory[req.body.brand_type]({
		brand_name: req.body.brand_name,
		is_colored: req.body.is_colored,
		category: req.body.category,
		added_by: req.body.added_by,
	});
	brand.save().then((result) => {
		res.send({
			success: true,
			message: 'Brand added',
		});
	});
});

router.post('/get-brands-bases', async function(req, res) {
	var factory = {
		Printer_Brands: Printer_Brands,
		Cartridge_Brands: Cartridge_Brands,
	};

	eval(req.body.model)
		.aggregate([
			{
				$group: {
					_id: {
						brand_name: '$brand_name',
					},
					brand_name: {
						$first: '$brand_name',
					},
				},
			},
		])
		.then((result) => {
			res.send({
				success: true,
				data: result,
			});
		});
});

module.exports = router;
