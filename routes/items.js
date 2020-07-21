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
				// new_item.save().then((result) => {
				// 	eval(category).updateOne({ _id: brand._id }, { $push: { items: result } }, async () => {
				// 		let added = await Items.findOne({ _id: result._id })
				// 			.populate('brand')
				// 			.exec();

				// 		res.send({
				// 			result: 'success',
				// 			message: 'Item added successfuly',
				// 			added,
				// 		});
				// 	});
				// });
				let updater = {
					item_name: req.body.item_name,
					onModel: req.body.category,
					brand: req.body.brand,
					content: req.body.content,
					stocks: req.body.stocks,
					added_by: user_info,
					photo_name: files[0] ? files[0] : 'default.png',
				};
				if (typeof req.body.price != 'undefined') {
					updater.price = req.body.price;
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
	const perPage = Number(req.params.rowsPerPage) || 10;
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
	const perPage = Number(req.params.rowsPerPage) || 10;
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

module.exports = router;
