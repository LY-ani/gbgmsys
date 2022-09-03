import Vue from 'vue';
import Vuex from 'vuex';
import userToken from './userToken.js';
import tab from './tab.js';
import user from './user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userToken,
    tab,
    user,
  },
});
