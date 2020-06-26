// modules
import Vue from 'vue/dist/vue.js';
import Vuelidate from 'vuelidate';
// local modules
import { store } from './store';

// usage
Vue.use(Vuelidate);

// components
import Index from './components/Index/Index.vue';
import Register from './components/Register/Register.vue';
import Login from './components/Login/Login.vue';

// renders
Vue.component('index-component', Index);
Vue.component('register-component', Register);
Vue.component('login-component', Login);

new Vue({
	el: '#app',
	store,
});
