const mongoose = require("mongoose");

const ItemCategoriesSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  model_name: { type: String, required: true },
  added_by: { type: mongoose.Schema.ObjectId, ref: "Users" },
});

module.exports = Item_Categories = mongoose.model("Item_Categories", ItemCategoriesSchema);
