import Vue from 'vue/dist/vue.js';

import Index from './components/Index/Index.vue';

Vue.component('index-component', Index);

new Vue({
	el: '#index',
});
