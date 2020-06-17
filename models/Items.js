const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  photo_name: { type: String, required: true },
  item_name: { type: String, required: true },
  price: { type: Number, required: false },
  content: { type: String, required: true },
  stocks: { type: String, required: true, default: 1 },
  added_by: { type: mongoose.Schema.ObjectId, ref: "Users" },
  added_date: { type: Date, required: true, default: Date.now },
});

module.exports = Items = mongoose.model("Items", ItemsSchema);
