<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6">
				<br />
				<br />
				<br />
				<article class=" mx-auto" style="max-width: 600px;">
					<h4 class="mt-3 text-center">Login to your Account</h4>
					<p class="text-center">Get started with your free account</p>
					<p>
						<a href class="btn btn-block btn-google">
							<i class="fa fa-google"></i> Login via Google
						</a>
						<a href class="btn btn-block btn-facebook">
							<i class="fa fa-facebook-f"></i> Login via facebook
						</a>
					</p>
					<p class="divider-text">
						<span class="bg-light">OR</span>
					</p>
					<form @submit.prevent="submitLogin">
						<div class="form-group input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">
									<i class="fa fa-envelope"></i>
								</span>
							</div>
							<input
								name
								:class="$v.your_email.$error ? 'form-control is-invalid' : 'form-control'"
								v-model.trim="$v.your_email.$model"
								placeholder="Enter Email"
								type="email"
							/>
							<div v-if="$v.your_email.$error" class="invalid-feedback">
								This fields is required
							</div>
						</div>
						<!-- form-group end.// -->
						<div class="form-group input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">
									<i class="fa fa-lock"></i>
								</span>
							</div>
							<input
								:class="$v.password.$error ? 'form-control is-invalid' : 'form-control'"
								v-model.trim="$v.password.$model"
								placeholder="Enter password"
								type="password"
							/>
							<div v-if="$v.password.$error" class="invalid-feedback">
								This field is required
							</div>
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary btn-block">Login</button>
						</div>
						<!-- form-group// -->
						<p class="text-center">
							Don't have an account?
							<a href="/register">Sign up</a>
						</p>
					</form>
				</article>
				<br />
				<br />
				<br />
			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
	data() {
		return {
			your_email: '',
			password: '',
		};
	},
	validations: {
		your_email: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(8),
		},
	},
	methods: {
		submitLogin: function() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				axios.post('/api-user/login-user', {
					email: this.email,
					password: this.password,
				});
			}
		},
	},
};
</script>

<style></style>
