// modules
import Vue from 'vue/dist/vue.js';
import VueScrollReveal from 'vue-scroll-reveal';
import Vuelidate from 'vuelidate';
// local modules
import { store } from './store';

// usage
Vue.use(Vuelidate);
Vue.use(VueScrollReveal);

// components
import Index from './components/Index/Index.vue';
import Register from './components/Register/Register.vue';
import Login from './components/Login/Login.vue';
import Products from './components/Products/Products.vue';

// renders
Vue.component('index-component', Index);
Vue.component('register-component', Register);
Vue.component('login-component', Login);
Vue.component('products-component', Products);

new Vue({
	el: '#app',
	store,
});
