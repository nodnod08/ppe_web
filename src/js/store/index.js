import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: constants,
	mutations: {
		setConfig(state, payload) {
			state[payload.property] = payload.data;
		},
	},
});
