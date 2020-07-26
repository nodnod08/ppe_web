<template>
	<div class="container">
		<br />
		<br />
		<br />
		<br />
		<div class="row">
			<div class="col-lg-12 col-md-12">
				<h4>Need Solutions? We covered your needs.</h4>
				<p>Contact with us. Fill the form and tell us your concerns or suggestions.</p>
			</div>
			<div class="col-lg-6 col-md-6">
				<form @submit.prevent>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input
							type="email"
							:class="$v.email.$error ? 'form-control is-invalid' : 'form-control'"
							v-model.trim="$v.email.$model"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<small id="emailHelp" class="form-text text-muted"
							>We'll never share your email with anyone else.</small
						>
						<div v-if="$v.email.$error" class="invalid-feedback">Please provide a valid email</div>
					</div>
					<div class="form-group">
						<label for="exampleInputEmail1">Name</label>
						<input
							type="text"
							:class="$v.name.$error ? 'form-control is-invalid' : 'form-control'"
							v-model.trim="$v.name.$model"
						/>
						<div v-if="$v.name.$error" class="invalid-feedback">Please provide a valid name</div>
					</div>
					<div class="form-group">
						<label for="exampleInputEmail1">Your Company (Optional)</label>
						<input type="text" class="form-control" />
					</div>
					<div class="form-group">
						<label for="exampleFormControlTextarea1">Message</label>
						<textarea
							:class="$v.message.$error ? 'form-control is-invalid' : 'form-control'"
							v-model.trim="$v.message.$model"
							id="exampleFormControlTextarea1"
							rows="3"
						></textarea>
						<div v-if="$v.message.$error" class="invalid-feedback">Please provide your Message</div>
					</div>
					<button type="submit" v-on:click="submitForm" class="btn btn-sm btn-outline-primary">
						Submit
					</button>
				</form>
			</div>
			<div class="col-md-6 col-lg-6">
				<div class="card">
					<img src="/assets/images/settings.jpg" height="300px" class="card-img-tops" alt="..." />
					<div class="card-body">
						<h5 class="card-title">We Provide</h5>
						<p class="card-text">
							<b>Preventive Maintenance Agreement which includes the following:</b>
						</p>
						<ul class="list-unstyled">
							<li>General cleaning of printers</li>
							<li>Printer repair and maintenance</li>
							<li>System testing and diagnostic</li>
							<li>Replacement of defective parts</li>
							<li>Printer Rentals / Fix Monthly (Single Function / Multifunction)</li>
							<li>Free Printer Use (Single Function / Multifunction)</li>
							<li>Comprehensive Maintenance Agreement for Existing Printers</li>
							<li>Cartridge Procurement (Monochrome / Color LaserJet)</li>
							<li>Per Page Charging (Delayed Billing, Monochrome, Color LaserJet)</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div class="row">
			<div class="col-lg-6 col-md-6"></div>
			<div class="col-lg-6 col-md-6">
				<h3>Warranties and Details</h3>
				<p>Know the status of your item, terms and warranty validity.</p>
				<small>We will respond quickly as we can.</small>
				<br />
				<br />
				<form @submit.prevent>
					<div class="form-group">
						<label for="exampleInputEmail1"
							>PRODUCT ID / SERIAL NUMBER / P.O NUMBER / SALES ORDER NUMBER</label
						>
						<input
							type="text"
							:class="$v.key_number.$error ? 'form-control is-invalid' : 'form-control'"
							v-model.trim="$v.key_number.$model"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<div v-if="$v.key_number.$error" class="invalid-feedback">
							Please provide a valid PRODUCT ID / SERIAL NUMBER / P.O NUMBER / SALES ORDER NUMBER
						</div>
					</div>
					<button type="submit" v-on:click="submitKey" class="btn btn-sm btn-outline-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
		<br />
		<br />
		<br />
		<br />
	</div>
</template>

<script>
import { required, email, sameAs, minLength, alpha, helpers } from 'vuelidate/lib/validators';
import axios from 'axios'
export default {
	props: ['data'],
	data() {
		return {
			email: '',
			name: '',
			company: '',
			key_number: '',
			message: '',
		};
	},
	validations: {
		email: {
			required,
			email,
		},
		name: {
			required,
			isNameValid: helpers.regex('isNameValid', /^[a-z0-9_ ]*$/i),
		},
		message: {
			required,
			isNameValid: helpers.regex('isNameValid', /^[a-z0-9_ ]*$/i),
		},
		key_number: {
			required,
		},
	},
	methods: {
		submitForm: function() {
			this.$v.name.$touch();
			this.$v.email.$touch();
			this.$v.message.$touch();
			if (!this.$v.message.$invalid && !this.$v.name.$invalid && !this.$v.email.$invalid) {
				this.$store.dispatch('setConfig', { property: 'loading', data: true });
				axios
					.post('/api-user/support-email', {
						email: this.email,
						name: this.name,
						message: this.message,
					})
					.then((res) => {
						console.log(res);
						this.$store.dispatch('setConfig', { property: 'loading', data: false });
					});
			}
		},
		submitKey: function() {
			this.$v.key_number.$touch();
			if (!this.$v.key_number.$invalid) {
				// axios.post('/api-user/register-user', {
				// 	email: this.your_email,
				// 	username: this.your_email,
				// 	first_name: this.first_name,
				// 	last_name: this.last_name,
				// 	password: this.password,
				// });
			}
		},
	},
};
</script>

<style>
.ck-editor__editable {
	min-height: 200px !important;
}

.card-img-tops {
	width: 100%;
	height: 15vw;
	object-fit: cover;
}
</style>
