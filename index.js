require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db").db;
const headerReceiver = require("./middleware/headerReceiver");

const app = express();

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyParser.json({ limit: "2048mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(headerReceiver);

// route list

app.use("/api-user", require("./routes/user"));
app.use("/api-item-categories", require("./routes/item_categories"));
app.use("/api-brands", require("./routes/brands"));
app.use("/api-items", require("./routes/items"));

// port listen
app.listen({ hostname: process.env.APP_URL, port: process.env.PORT || 5000 }, () => {
  console.log(`running on port ${process.env.PORT || 3000}`);
});
