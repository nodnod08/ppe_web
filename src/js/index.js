// modules
import Vue from 'vue/dist/vue.js';
import VueScrollReveal from 'vue-scroll-reveal';
import Vuelidate from 'vuelidate';
import babelPolyfill from 'babel-polyfill';
import CKEditor from '@ckeditor/ckeditor5-vue';

// local modules
import { store } from './store';

// usage
Vue.use(Vuelidate);
Vue.use(VueScrollReveal);
Vue.use(CKEditor);

// components pages
import Index from './components/pages/Index/Index.vue';
import Register from './components/pages/Register/Register.vue';
import Login from './components/pages/Login/Login.vue';
import Product from './components/pages/Product/Product.vue';
import Products from './components/pages/Products/Products.vue';
import About from './components/pages/About/About.vue';
import Support from './components/pages/Support/Support.vue';
import Search from './components/modules/Search/Search.vue';

// components modules
import Pagination from './components/modules/Pagination/Pagination.vue';

// renders
Vue.component('index-component', Index);
Vue.component('register-component', Register);
Vue.component('login-component', Login);
Vue.component('products-component', Products);
Vue.component('product-component', Product);
Vue.component('about-us-component', About);
Vue.component('support-component', Support);
Vue.component('search-component', Search);
Vue.component('Paginate', Pagination);

new Vue({
	el: '#app',
	store,
});
