// MODULES
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const multer = require('multer');
const path = require('path');

// MODELS
const Item_Categories = require('../models/Item_Categories');
const Users = require('../models/Users');
const Printer_Brands = require('../models/Printer_Brands');
const Cartridge_Brands = require('../models/Cartridge_Brands');
const Items = require('../models/Items');

router.post('/add-item', async function (req, res) {
  var factory = {
    Printer_Brands: Printer_Brands,
    Cartridge_Brands: Cartridge_Brands,
  };
  const files = [];
  const storage = multer.diskStorage({
    destination: './storage/',
    filename: function (req, file, cb) {
      filename =
        file.originalname.split(' ').join('_').split('.').slice(0, -1).join('_') +
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
    const category = JSON.parse(req.body.category);
    const added_by = JSON.parse(req.body.added_by);
    const brand = JSON.parse(req.body.brand);

    Users.findOne({ _id: added_by._id }).then((user_info) => {
      const new_item = new Items({
        item_name: req.body.item_name,
        photo_name: files[0],
        content: req.body.content,
        stocks: req.body.stocks,
        added_by: user_info,
      });
      if (typeof req.body.price != 'undefined') {
        new_item.price = req.body.price;
      }
      new_item.save().then((result) => {
        eval(category.model_name).updateOne(
          { _id: brand._id },
          { $push: { items: result } },
          () => {
            res.send({
              success: true,
              message: 'Item added successfuly',
            });
          }
        );
      });
    });
  });
});

router.post('/delete-array', function (req, res) {
  Printer_Brands.update({ _id: req.body.id }, { $pull: { items: req.body.id_array } }).then(
    (result) => {
      console.log(result);
    }
  );
});

module.exports = router;
