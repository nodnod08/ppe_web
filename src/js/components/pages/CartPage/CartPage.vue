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
							<div>
								<md-table>
									<md-table-row>
										<md-table-head>Product Photo</md-table-head>
										<md-table-head>Product Details</md-table-head>
										<md-table-head>Quantity</md-table-head>
										<md-table-head>Action</md-table-head>
										<md-table-head>Price</md-table-head>
										<md-table-head>Sub Price</md-table-head>
									</md-table-row>

									<md-table-row v-for="(item, i) in items" v-bind:key="i">
										<md-table-cell>
											<img
												:src="'/storage/' + item.photo_name"
												width="100px"
												height="100px"
												alt=""
											/>
										</md-table-cell>
										<md-table-cell
											><b>{{ item.item_name }}</b
											><br />{{ item.brand.brand_name }}</md-table-cell
										>
										<md-table-cell>
											<input
												type="number"
												min="1"
												@change="modifySub"
												v-model="item.count"
												class="form-control form-control-sm"
											/>
										</md-table-cell>
										<md-table-cell>
											<button class="btn btn-sm btn-outline-danger">
												<i class="fa fa-minus-circle"></i> Remove
											</button>
										</md-table-cell>
										<md-table-cell
											>&#8369;
											{{
												item.price
													.toFixed(2)
													.toString()
													.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
											}}</md-table-cell
										>
										<md-table-cell
											>&#8369;
											{{
												(item.price * item.count)
													.toFixed(2)
													.toString()
													.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
											}}</md-table-cell
										>
									</md-table-row>

									<md-table-row>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell><h6>Sub total</h6></md-table-cell>
										<md-table-cell
											>&#8369;
											{{
												subTotal
													.toFixed(2)
													.toString()
													.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
											}}</md-table-cell
										>
									</md-table-row>
									<md-table-row>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell><h6>Shipping & Tax</h6></md-table-cell>
										<md-table-cell>&#8369; 0.00</md-table-cell>
									</md-table-row>
									<md-table-row>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell
											><h6><b>Total</b></h6></md-table-cell
										>
										<md-table-cell
											>&#8369;
											{{
												subTotal
													.toFixed(2)
													.toString()
													.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
											}}</md-table-cell
										>
									</md-table-row>
									<md-table-row>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell></md-table-cell>
										<md-table-cell
											><md-button class="md-raised md-primary" @click="setDone('first', 'second')"
												>Proceed to Billing Info</md-button
											></md-table-cell
										>
									</md-table-row>
								</md-table>
							</div>
							<br />
							<br />
							<br />
						</md-step>

						<md-step id="second" md-label="Billing Information" :md-done.sync="second">
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
							<md-button class="md-raised md-primary" @click="setDone('second', 'first')"
								>Back</md-button
							>
							<md-button class="md-raised md-primary" @click="setDone('second', 'third')"
								>Go to Payment</md-button
							>
						</md-step>

						<md-step id="third" md-label="Make Payment" :md-done.sync="third">
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

export default {
	created() {},
	data() {
		return {
			items: [],
			finish: false,
			subTotal: 0,
			active: 'first',
			first: false,
			second: false,
			third: false,
			fourth: false,
			secondStepError: null,
		};
	},
	watch: {
		'$store.state.cart.items': function() {
			this.getItemsViaCookies();
		},
	},
	methods: {
		getItemsViaCookies: function() {
			axios
				.post('/api-items/get-all-items', {
					items: this.$store.state.cart.items,
				})
				.then((res) => {
					this.items = res.data.result;
				})
				.then(async () => {
					this.items = await this.items.map((obj) => ({
						...obj,
						count: Number(1),
						total_price: 1 * obj.price,
					}));
					this.modifySub();
					this.finish = true;
				});
		},
		modifySub: function() {
			this.subTotal = 0;
			this.items.map((item) => {
				this.subTotal += item.price * item.count;
			});
		},
		setDone(id, index) {
			this[id] = true;

			if (index) {
				this.active = index;
			}
		},
		setError() {
			this.secondStepError = 'This is an error!';
		},
	},
};
</script>

<style></style>
