require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./config/db').db;
require('./config/passport')(passport);

const app = express();

// middlewares
app.use(cors());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});
app.use(bodyParser.json({ limit: '2048mb' }));
app.use(express.urlencoded({ extended: false }));

// serving external files
app.use(express.static(path.join(__dirname, '/src/')));
app.set('view engine', 'ejs');

// session
app.use(
	session({
		secret: process.env.SECRET_SESSION,
		resave: false,
		proxy: true,
		saveUninitialized: false,
		cookie: { secure: false },
		store: new MongoStore({
			url: process.env.MONGO_URI,
			ttl: 14 * 24 * 60 * 60,
			autoRemove: 'interval',
			autoRemoveInterval: 5,
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

// page route list
app.use('/', require('./routes/index'));

// api route list
app.use('/api-user', require('./routes/user'));
app.use('/api-item-categories', require('./routes/item_categories'));
app.use('/api-brands', require('./routes/brands'));
app.use('/api-items', require('./routes/items'));

// port listen
app.listen({ hostname: process.env.APP_URL, port: process.env.PORT || 5000 }, () => {
	console.log(`running on port ${process.env.PORT || 3000}`);
});
