// MODULES
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// MODELS
const Item_Categories = require("../models/Item_Categories");
const Users = require("./../models/Users");
const Printer_Brands = require("../models/Printer_Brands");
const Cartridge_Brands = require("../models/Cartridge_Brands");

router.post("/add-category", async function (req, res) {
  Users.findOne({ _id: req.body._id }).then((result) => {
    const new_category = new Item_Categories({
      category_name: req.body.category_name,
      model_name: req.body.model_name,
      added_by: result,
    });
    new_category.save().then(() => {
      res.send({
        success: true,
        message: "Category added!",
      });
    });
  });
});

router.get("/get-categories", async function (req, res) {
  Item_Categories.find({}).then((result) => {
    res.send({
      success: true,
      data: result,
    });
  });
});

router.get("/get-brands/:category", async function (req, res) {
  const model_name = JSON.parse(req.params.category);
  eval(model_name.model_name)
    .find({})
    .then((result) => {
      res.send({
        success: true,
        data: result,
      });
    });
});

module.exports = router;
