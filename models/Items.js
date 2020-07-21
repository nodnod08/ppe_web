const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
	photo_name: { type: String, required: true, default: 'default.png' },
	item_name: { type: String, required: true },
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		refPath: 'onModel',
	},
	onModel: {
		type: String,
		required: true,
		enum: ['Cartridge_Brands', 'Printer_Brands'],
	},
	price: { type: Number, required: false },
	content: { type: String, required: true },
	stocks: { type: String, required: true, default: 1 },
	added_by: { type: mongoose.Schema.ObjectId, ref: 'Users' },
	added_date: { type: Date, required: true, default: Date.now },
});

module.exports = Items = mongoose.model('Items', ItemsSchema);
