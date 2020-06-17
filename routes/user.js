// MODULES
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

// MODELS
const Users = require("./../models/Users");

router.post("/register-admin", async function (req, res) {
  const user_inital = {
    username: req.body.username,
    userType: 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    fullName: `${req.body.firstName} ${req.body.lastName}`,
  };
  function password_hasher(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        callback(err, hash);
      });
    });
  }

  password_hasher(req.body.password, (err, hash) => {
    user_inital.password = hash;
    const new_user = new Users(user_inital);
    new_user.save().then((result) => {
      res.send({
        success: true,
        message: "Admin successfuly registered",
      });
    });
  });
});

router.post("/register-user", async function (req, res) {
  const user_inital = {
    username: req.body.username,
    userType: 2,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    fullName: `${req.body.firstName} ${req.body.lastName}`,
  };
  function password_hasher(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        callback(err, hash);
      });
    });
  }

  password_hasher(req.body.password, (err, hash) => {
    user_inital.password = hash;
    const new_user = new Users(user_inital);
    new_user.save().then((result) => {
      res.send({
        success: true,
        message: "Successfuly registered",
      });
    });
  });
});

router.post("/login-admin", function (req, res) {
  Users.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      bcrypt.compare(req.body.password, result.password).then((response) => {
        if (response) {
          function JWT_registered(person, callback) {
            let person_new = _.omit(person.toObject(), ["password"]);
            jwt.sign(
              {
                data: person_new,
              },
              process.env.SECRET_KEY,
              { expiresIn: "12h" },
              function (err, token) {
                delete person_new.password;
                callback(err, token, person_new);
              }
            );
          }

          JWT_registered(result, (err, token, result_no_password) => {
            res.send({
              success: true,
              data: {
                token,
                user_credentials: result_no_password,
              },
              message: "Successfuly logged in",
            });
          });
        } else {
          res.send({
            success: false,
            data: null,
            message: "Incorrect email or password",
          });
        }
      });
    } else {
      res.send({
        success: false,
        data: null,
        message: "Incorrect email or password",
      });
    }
  });
});

module.exports = router;
