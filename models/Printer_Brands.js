const mongoose = require("mongoose");

const Printer_Brands_Schema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  category: { type: String, required: true },
  is_colored: { type: Boolean, required: true },
  items: [{ type: mongoose.Schema.ObjectId, ref: "Items" }],
  added_by: { type: mongoose.Schema.ObjectId, ref: "Users" },
});

module.exports = Printer_Brands = mongoose.model("Printer_Brands", Printer_Brands_Schema);
