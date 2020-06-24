import Vue from 'vue/dist/vue.js';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import Vuelidate from 'vuelidate';

import Login from './components/Register/Login.vue';

Vue.use(Vuelidate);
Vue.component('login-component', Index);

new Vue({
	el: '#login',
});
