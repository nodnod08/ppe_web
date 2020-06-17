const mongoose = require("mongoose");

const Cartridge_Brands_Schema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  is_colored: { type: Boolean, required: true },
  items: [{ type: mongoose.Schema.ObjectId, ref: "Items" }],
  added_by: { type: mongoose.Schema.ObjectId, ref: "Users" },
});

module.exports = Cartridge_Brands = mongoose.model("Cartridge_Brands", Cartridge_Brands_Schema);
