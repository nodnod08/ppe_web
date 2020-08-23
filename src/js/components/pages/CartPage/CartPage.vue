<template>
	<div class="container">
		<br />
		<br />
		<br />
		<div class="row">
			<div class="col-lg-12">
				<div>
					<md-steppers :md-active-step.sync="active" md-linear>
						<md-step id="first" md-label="Your Cart Items" :md-done.sync="first">
							<br />
							<br />
							<CartEdit @setItems="setAllItems" @firstPass="setDone"></CartEdit>
							<br />
							<br />
							<br />
						</md-step>

						<md-step id="second" md-label="Billing Information" :md-done.sync="second">
							<br />
							<br />
							<Billing @setBill="setBilling" @firstPass="setDone"></Billing>
							<br />
							<br />
							<br />
						</md-step>

						<md-step id="third" md-label="Make Payment" :md-done.sync="third">
							<Payment :items="items" :bill="bill" @firstPass="setDone"></Payment>
						</md-step>
						<md-step id="fourth" md-label="Confirmation Page" :md-done.sync="fourth">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet
								quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus
								blanditiis tempore, dolores voluptas dolore placeat nulla.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet
								quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus
								blanditiis tempore, dolores voluptas dolore placeat nulla.
							</p>
							<md-button class="md-raised md-primary" @click="setDone('fourth')">Done</md-button>
						</md-step>
					</md-steppers>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import CartEdit from './../../modules/CartEdit/CartEdit.vue';
import Billing from './../../modules/Billing/Billing.vue';
import Payment from './../../modules/Payment/Payment.vue';

export default {
	components: {
		CartEdit,
		Billing,
		Payment,
	},
	data() {
		return {
			active: 'third',
			first: false,
			second: false,
			third: false,
			fourth: false,
			secondStepError: null,
			bill: {},
			items: [],
		};
	},
	methods: {
		setDone(id, index) {
			this[id] = true;

			if (index) {
				this.active = index;
			}
		},
		setError() {
			this.secondStepError = 'This is an error!';
		},
		setBilling: function(bill) {
			this.bill = bill;
		},
		setAllItems: function(items) {
			this.items = items;
		},
	},
};
</script>

<style></style>
