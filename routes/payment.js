// MODULES
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');
const stripe = Stripe(process.env.VUE_APP_SECRET_KEY);

// MODELS
const Users = require('./../models/Users');
const Subscription = require('./../models/Subscription');

router.post('/stripe-customer', async function(req, res) {
	const bill = req.body.billing;
	const customer = await stripe.customers.create({
		address: {
			line1: bill.address,
			city: bill.city,
			country: '.ph',
			postal_code: bill.zip,
			state: bill.state,
		},
		email: bill.email,
		phone: bill.phone,
		shipping: {
			name: `${bill.first_name} ${bill.last_name}`,
			address: {
				line1: bill.address,
				city: bill.city,
				country: bill.country,
				postal_code: bill.zip,
				state: bill.state,
			},
		},
		description: 'Creating Customer',
	});

	res.send({
		customer,
	});
});

router.post('/stripe-charge', async function(req, res) {
	const token = req.body.token;
	const bill = req.body.billing;
	const total = String(req.body.subTotal) + '00';
	const charge = await stripe.charges.create({
		amount: Number(total),
		currency: process.env.CURRENCY,
		source: token,
		receipt_email: bill.your_email,
		shipping: {
			name: `${bill.first_name} ${bill.last_name}`,
			address: {
				line1: bill.address,
				city: bill.city,
				country: bill.country,
				postal_code: bill.zip,
				state: bill.state,
			},
			carrier: 'FEDEX',
			phone: bill.phone,
		},
	});

	res.send({
		transaction_result: charge,
	});
});

module.exports = router;
