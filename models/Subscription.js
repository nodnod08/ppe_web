const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
	email: { type: String, required: true },
});

module.exports = Subscription = mongoose.model('subscriptions', SubscriptionSchema);
