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
	},
	actions: {
		setConfig({ commit }, payload) {
			commit('setConfig', payload);
		},
		loader({ commit }) {
			commit('loader');
		},
	},
});
