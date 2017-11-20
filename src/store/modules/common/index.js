import {
  SET_SPINNER_LOADING
} from './constants';

export const state = {
  isLoading: false
};

export const actions = {
};

export const getters = {
  isLoading: state => state.isLoading
};

export const mutations = {
  [SET_SPINNER_LOADING] (currentState, toggle) {
    currentState.isLoading = toggle;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
