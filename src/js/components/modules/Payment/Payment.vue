<template>
	<div>
		<br />
		<br />
		<div>
			<h5>Select Payment Method</h5>
			<md-radio class="md-primary" v-model="type" :value="1">Credit Card</md-radio>
			<md-radio class="md-primary" v-model="type" :value="2">Paypal</md-radio>
			<md-radio class="md-primary" v-model="type" :value="3">GCash</md-radio>
			<md-radio class="md-primary" v-model="type" :value="4">PayMaya</md-radio>
		</div>
		<div v-show="type == 1">
			<div class="row">
				<div class="col-6">
					<input
						type="text"
						v-model="cardHolder"
						class="form-control form-control-sm"
						placeholder="Card Holder Name"
					/>
				</div>
				<div class="col-6">
					<input
						type="email"
						v-model="email"
						class="form-control form-control-sm"
						placeholder="Email"
					/>
				</div>
			</div>
			<br />
			<div class="col-12 card-container">
				<div ref="card" class="field"></div>
			</div>
			<br />
			<md-button class="md-raised md-primary" @click="purchaseStripe">Pay Now</md-button>
		</div>
		<br />
		<br />
	</div>
</template>

<script>
import axios from 'axios';
let stripe = Stripe(process.env.VUE_APP_PUBLISHABLE_KEY),
	elements = stripe.elements(),
	card = undefined;

export default {
	props: ['bill', 'items'],
	data() {
		return {
			type: 1,
			cardHolder: '',
			email: '',
			final_bill: {},
			final_items: [],
		};
	},
	watch: {
		bill: function(newVal, old_val) {
			this.final_bill = newVal;
		},
		items: function(newVal, old_val) {
			this.final_items = newVal;
		},
	},
	mounted: function() {
		card = elements.create('card');
		card.mount(this.$refs.card);
	},
	methods: {
		purchaseStripe: async function() {
			let self = this;
			stripe
				.createToken({
					...card,
					name: this.cardHolder,
				})
				.then(function(result) {
					let token = result.token.id;
					let subTotal = 0;
					self.final_items.map((item) => {
						subTotal += item.price * item.count;
					});
					axios
						.post('/api-payment/stripe-charge', {
							token,
							billing: self.final_bill,
							items: self.final_items,
							subTotal,
						})
						.then((tr) => {
							if (tr.data.transaction_result.status == 'succeeded') {
								this.$emit('firstPass', 'third', 'fourth');
							}
						});
				});
		},
	},
};
</script>

<style>
.field {
	background: white;
	box-sizing: border-box;
	font-weight: 400;
	border: 1px solid #cfd7df;
	color: #32315e;
	outline: none;
	flex: 1;
	height: 48px;
	line-height: 48px;
	padding: 15px 20px 20px 20px;
	cursor: text;
}

.field::-webkit-input-placeholder {
	color: #cfd7df;
}
.field::-moz-placeholder {
	color: #cfd7df;
}

.field:focus,
.field.StripeElement--focus {
	border-color: #404040;
}

.card-container {
	padding-left: 0;
	padding-right: 0;
}

.md-button {
	margin-left: 0;
	margin-right: 0;
}
</style>
