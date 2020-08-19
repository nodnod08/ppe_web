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
		loader(state) {
			state.loading = true;
			setTimeout(function() {
				state.loading = false;
			}, 1500);
		},
		modifyCart(state, payload) {
			state.cart.user = payload.user;
			state.cart.items = payload.items;
		},
	},
	actions: {
		setConfig({ commit }, payload) {
			commit('setConfig', payload);
		},
		modifyCart({ commit }, payload) {
			commit('modifyCart', payload);
		},
		loader({ commit }) {
			commit('loader');
		},
	},
});
