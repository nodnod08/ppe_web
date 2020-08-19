// MODULES
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const mongoose = require('mongoose');
const moment = require('moment');
const getmac = require('getmac');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');
const Items = require('../models/Items');

router.post('/update-create', async function(req, res) {
	var factory = {
		Printer_Brands: Printer_Brands,
		Cartridge_Brands: Cartridge_Brands,
	};
	const files = [];
	const storage = multer.diskStorage({
		destination: './src/storage/',
		filename: function(req, file, cb) {
			filename =
				file.originalname
					.split(' ')
					.join('_')
					.split('.')
					.slice(0, -1)
					.join('_') +
				'_' +
				Date.now() +
				path.extname(file.originalname);
			files.push(filename);
			cb(null, filename);
		},
	});

	const upload = multer({
		storage: storage,
	}).single('file');

	upload(req, res, (err) => {
		const category = req.body.category;
		const added_by = JSON.parse(req.body.added_by);
		const brand = req.body.brand;

		if (req.body.type == 'update') {
			const oldData = JSON.parse(req.body.old_data);
			Users.findOne({ _id: added_by._id }).then((user_info) => {
				let updater = {
					item_name: req.body.item_name,
					onModel: req.body.category,
					brand: req.body.brand,
					content: req.body.content,
					stocks: req.body.stocks,
					added_by: user_info,
					photo_name: files[0] ? files[0] : oldData.photo_name,
					updated: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
				};
				if (typeof req.body.price != 'undefined') {
					updater.price = req.body.price.replace(',.', '');
				}
				if (files[0]) {
					var filePath = path.join(__dirname, '..', '/src', '/storage', `/${oldData.photo_name}`);
					fs.unlinkSync(filePath);
				}
				Items.updateOne({ _id: oldData._id }, updater).then(() => {
					res.send({
						result: 'success',
						message: 'Item has been updated',
					});
				});
			});
		} else {
			Users.findOne({ _id: added_by._id }).then((user_info) => {
				const new_item = new Items({
					item_name: req.body.item_name,
					photo_name: files[0],
					content: req.body.content,
					stocks: req.body.stocks,
					added_by: user_info,
					onModel: category,
					brand: brand,
					updated: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
				});
				if (typeof req.body.price != 'undefined') {
					new_item.price = req.body.price;
				}
				new_item.save().then((result) => {
					eval(category).updateOne({ _id: brand._id }, { $push: { items: result } }, async () => {
						let added = await Items.findOne({ _id: result._id })
							.populate('brand')
							.exec();

						res.send({
							result: 'success',
							message: 'Item added successfuly',
							added,
						});
					});
				});
			});
		}
	});
});

router.get('/get-items/:page/:rowsPerPage', async function(req, res) {
	const pageUrl = Number(req.params.page) || 1;
	const perPage = Number(req.params.rowsPerPage) || 8;
	const offset = perPage * pageUrl - perPage;

	const result = await Items.find({}, null, { limit: perPage, skip: offset })
		.populate('brand')
		.exec();

	const total = await Items.countDocuments();

	res.send({
		total,
		data: result,
		current_page: pageUrl,
		total_pages: Math.ceil(total / perPage),
	});
});

router.post('/delete-item', async function(req, res) {
	await eval(req.body.onModel).updateOne(
		{ _id: req.body.id },
		{ $pull: { items: req.body.idToDelete } }
	);

	await Items.find({ _id: req.body.idToDelete }).deleteOne();
	if (req.body.photo != 'default.png') {
		var filePath = path.join(__dirname, '..', '/src', '/storage', `/${req.body.photo}`);
		fs.unlinkSync(filePath);
	}

	const pageUrl = Number(req.params.page) || 1;
	const perPage = Number(req.params.rowsPerPage) || 8;
	const offset = perPage * pageUrl - perPage;

	const result = await Items.find({}, null, { limit: perPage, skip: offset })
		.populate('brand')
		.exec();

	const total = await Items.countDocuments();

	res.send({
		total,
		data: result,
		current_page: pageUrl,
		total_pages: Math.ceil(total / perPage),
	});
});

router.get('/get-all-items', async function(req, res) {
	Items.find({}).then((result) => {
		res.send({
			data: result,
		});
	});
});

router.post('/add-to-cart', async function(req, res) {
	if (req.isAuthenticated()) {
		let product = req.body.product;
		let current_user_products =
			typeof req.cookies[`user_${req.user._id}`] != 'undefined'
				? req.cookies[`user_${req.user._id}`]
				: [];
		current_user_products.push(product);

		res.cookie(`user_${req.user._id}`, JSON.stringify(current_user_products));
		res.send({
			result: req.cookies[`user_${req.user._id}`],
		});
	} else {
		let promise = new Promise(function(resolve, reject) {
			let product = req.body.product;
			let_user_mac = `user_${getmac.default()}`;
			let current_user_products;

			if (typeof req.cookies[let_user_mac] != 'undefined') {
				current_user_products = JSON.parse(req.cookies[let_user_mac]);
			} else {
				current_user_products = [];
			}

			current_user_products.push(product._id);
			if (current_user_products.length) {
				resolve([let_user_mac, JSON.stringify(current_user_products)]);
			}
		});

		// resolve runs the first function in .then
		promise
			.then((result) => {
				res.cookie([result[0]], result[1]);
				return result;
			})
			.then((result) => {
				res.send({
					result: result,
				});
			});
	}
});

router.get('/get-user-item', function(req, res) {
	if (req.isAuthenticated()) {
		let user = `user_${req.user._id}`;
		res.send({
			user,
			result: JSON.parse(req.cookies[user]),
		});
	} else {
		let user = `user_${getmac.default()}`;
		res.send({
			user,
			result: JSON.parse(req.cookies[user]),
		});
	}
});

module.exports = router;
