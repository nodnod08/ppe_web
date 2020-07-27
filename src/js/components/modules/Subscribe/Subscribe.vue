<template>
	<form @submit.prevent>
		<h6>SUBSCRIBE US</h6>
		<br />
		<div class="form-group">
			<input
				type="email"
				:class="$v.email.$error ? 'form-control is-invalid' : 'form-control'"
				v-model.trim="$v.email.$model"
				placeholder="Email"
				aria-label="Email"
				aria-describedby="addon-wrapping"
			/>
			<div v-if="$v.email.$error" class="invalid-feedback">Please provide a valid email</div>
		</div>
		<br />
		<button
			type="submit"
			v-on:click="submitForm"
			class="btn btn-sm btn-outline-primary my-2 my-sm-0"
		>
			SUBSCRIBE
		</button>
	</form>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { required, email } from 'vuelidate/lib/validators';
export default {
	data() {
		return {
			email: '',
		};
	},
	validations: {
		email: {
			required,
			email,
		},
	},
	methods: {
		submitForm: function() {
			this.$v.email.$touch();
			if (!this.$v.email.$invalid) {
				this.$store.dispatch('setConfig', { property: 'loading', data: true });
				axios
					.post('/api-user/subscribe-email', {
						email: this.email,
					})
					.then((res) => {
						this.$store.dispatch('setConfig', {
							property: 'loading',
							data: false,
						});
						Swal.fire(res.data.success ? 'Subscribed' : 'Error', res.data.message, res.data.type);
					});
			}
		},
	},
};
</script>

<style></style>
