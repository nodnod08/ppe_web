import Vue from 'vue/dist/vue.js';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import Vuelidate from 'vuelidate';

import Register from './components/Register/Register.vue';

Vue.use(Vuelidate);
Vue.component('register-component', Register);

new Vue({
	el: '#register',
});
