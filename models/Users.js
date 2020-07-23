const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	username: { type: String, required: true },
	userType: { type: Number, required: true },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	fullName: { type: String, required: true },
	password: { type: String, required: true },
	created_at: { type: Date, required: true, default: Date.now },
	added_by: { type: String, required: true },
});

module.exports = Users = mongoose.model('Users', UsersSchema);
