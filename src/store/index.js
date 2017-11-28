import Vue from 'vue';
import Vuex from 'vuex';

import employers from './modules/employers';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    employers,
    users
  }
});
