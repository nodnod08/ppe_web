<template>
	<div class="row">
		<!-- <div class="col-md-4 order-md-2 mb-4">
			<h4 class="d-flex justify-content-between align-items-center mb-3">
				<span class="text-muted">Your cart</span>
				<span class="badge badge-secondary badge-pill">3</span>
			</h4>
			<ul class="list-group mb-3">
				<li class="list-group-item d-flex justify-content-between lh-condensed">
					<div>
						<h6 class="my-0">Product name</h6>
						<small class="text-muted">Brief description</small>
					</div>
					<span class="text-muted">$12</span>
				</li>
				<li class="list-group-item d-flex justify-content-between lh-condensed">
					<div>
						<h6 class="my-0">Second product</h6>
						<small class="text-muted">Brief description</small>
					</div>
					<span class="text-muted">$8</span>
				</li>
				<li class="list-group-item d-flex justify-content-between lh-condensed">
					<div>
						<h6 class="my-0">Third item</h6>
						<small class="text-muted">Brief description</small>
					</div>
					<span class="text-muted">$5</span>
				</li>
				<li class="list-group-item d-flex justify-content-between bg-light">
					<div class="text-success">
						<h6 class="my-0">Promo code</h6>
						<small>EXAMPLECODE</small>
					</div>
					<span class="text-success">-$5</span>
				</li>
				<li class="list-group-item d-flex justify-content-between">
					<span>Total (USD)</span>
					<strong>$20</strong>
				</li>
			</ul>

			<form class="card p-2">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Promo code" />
					<div class="input-group-append">
						<button type="submit" class="btn btn-secondary">Redeem</button>
					</div>
				</div>
			</form>
		</div> -->
		<div class="col-md-8 order-md-1">
			<h4 class="mb-3">Billing address</h4>
			<form class="needs-validation" novalidate autocomplete="on">
				<div class="row">
					<div class="col-md-6 mb-3">
						<label for="firstName">First name</label>
						<input
							type="text"
							:class="
								$v.bill.first_name.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.first_name.$model"
							id="firstName"
							placeholder=""
						/>
						<div v-if="$v.bill.first_name.$error" class="invalid-feedback">
							Please provide a valid first name
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="lastName">Last name</label>
						<input
							type="text"
							:class="
								$v.bill.last_name.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.last_name.$model"
							id="lastName"
							placeholder=""
						/>
						<div v-if="$v.bill.last_name.$error" class="invalid-feedback">
							Please provide a valid last name
						</div>
					</div>
				</div>

				<div class="row">
					<div class="mb-3 col-md-6">
						<label for="email">Email <span class="text-muted">(Optional)</span></label>
						<input
							type="email"
							:class="
								$v.bill.your_email.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.your_email.$model"
							id="email"
							placeholder="you@example.com"
						/>
						<div v-if="$v.bill.your_email.$error" class="invalid-feedback">
							Please provide a valid email
						</div>
					</div>

					<div class="mb-3 col-md-6">
						<label for="email">Phone Number</label>
						<input
							type="text"
							:class="
								$v.bill.phone.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.phone.$model"
							id="email"
							placeholder="+639061111111"
						/>
						<div v-if="$v.bill.phone.$error" class="invalid-feedback">
							Please provide a valid phone number
						</div>
					</div>
				</div>

				<div class="mb-3">
					<label for="address">Address</label>
					<input
						type="text"
						:class="
							$v.bill.address.$error
								? 'form-control form-control-sm is-invalid'
								: 'form-control form-control-sm'
						"
						v-model.trim="$v.bill.address.$model"
						id="address"
						placeholder="1234 Main St"
					/>
					<div v-if="$v.bill.address.$error" class="invalid-feedback">
						Please provide a valid address
					</div>
				</div>

				<div class="mb-3">
					<label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
					<input
						type="text"
						class="form-control form-control-sm"
						id="address2"
						placeholder="Apartment or suite"
					/>
				</div>

				<div class="row">
					<div class="col-md-4 mb-3">
						<label for="address">Country</label>
						<input
							type="text"
							:class="
								$v.bill.country.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.country.$model"
							id="address"
							placeholder="Philippines"
						/>
						<div v-if="$v.bill.country.$error" class="invalid-feedback">
							Please provide a valid country
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="address">State</label>
						<input
							type="text"
							:class="
								$v.bill.state.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.state.$model"
							id="address"
							placeholder="Manila"
						/>
						<div v-if="$v.bill.state.$error" class="invalid-feedback">
							Please provide a valid state
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="address">City</label>
						<input
							type="text"
							:class="
								$v.bill.city.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.city.$model"
							id="city"
							placeholder="Muntinlupa"
						/>
						<div v-if="$v.bill.city.$error" class="invalid-feedback">
							Please provide a valid city
						</div>
					</div>
					<div class="col-md-3 mb-3">
						<label for="zip">Zip</label>
						<input
							type="number"
							:class="
								$v.bill.zip.$error
									? 'form-control form-control-sm is-invalid'
									: 'form-control form-control-sm'
							"
							v-model.trim="$v.bill.zip.$model"
							id="zip"
							placeholder=""
							required
						/>
						<div v-if="$v.bill.zip.$error" class="invalid-feedback">
							Please provide a zip code
						</div>
					</div>
				</div>
				<md-button class="md-raised md-primary" @click="setDoneRoot('second', 'first')"
					>Back</md-button
				>
				<md-button class="md-raised md-primary" @click="setDoneRoot('second', 'third')"
					>Go to Payment</md-button
				>
			</form>
		</div>
	</div>
</template>

<script>
import {
	required,
	email,
	sameAs,
	minLength,
	alpha,
	numeric,
	helpers,
} from 'vuelidate/lib/validators';
const extra = helpers.regex('alpha', /^[0-9a-zA-Z #-.,_*]*$/);
export default {
	data() {
		return {
			bill: {
				first_name: '',
				last_name: '',
				phone: '',
				your_email: '',
				address: '',
				zip: '',
				country: '',
				state: '',
				city: '',
			},
		};
	},
	validations: {
		bill: {
			your_email: {
				required,
				email,
			},
			first_name: {
				required,
				alpha,
			},
			last_name: {
				required,
				alpha,
			},
			address: {
				required,
				extra,
			},
			country: {
				required,
				extra,
			},
			state: {
				required,
				extra,
			},
			city: {
				required,
				extra,
			},
			zip: {
				required,
				numeric,
			},
			phone: {
				required,
				numeric,
			},
		},
	},
	methods: {
		setDoneRoot(current, next) {
			if (next == 'first') {
				this.$emit('firstPass', current, next);
			} else {
				this.$v.$touch();
				if (!this.$v.$invalid) {
					this.$emit('setBill', this.bill);
					this.$emit('firstPass', current, next);
				}
			}
		},
	},
};
</script>

<style></style>
