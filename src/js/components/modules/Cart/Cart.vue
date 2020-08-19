<template>
	<ul class="navbar-nav">
		<li class="nav-item active">
			<a class="nav-link" href="/your-cart">
				<i class="fa fa-shopping-cart fa-2x"></i>
				<span class="badge badge-primary">{{ count }}</span>
			</a>
		</li>
	</ul>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			count: this.$store.state.cart.items.length,
		};
	},
	watch: {
		'$store.state.cart.items': function() {
			this.count = this.$store.state.cart.items.length;
		},
	},
	created() {
		if (this.$store.state.cart.user == '') {
			this.getitemCookie();
		}
	},
	methods: {
		getitemCookie: function() {
			axios.get('/api-items/get-user-item').then((res) => {
				let items = res.data.result;
				let user = res.data.user;
				this.$store.commit('modifyCart', {
					user: user,
					items: items,
				});
			});
		},
	},
};
</script>

<style></style>
