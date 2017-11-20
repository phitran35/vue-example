import {
  buildOptions,
  getEndPoints
} from '../../../utils/api-call';
import {
  makeCall
} from '../../../utils/request';
import {
  FETCH_USER_LOGIN,
  SET_USER_LOGIN
} from './constants';
import localStorageKeys from '../../local-storage-keys';

export const state = {
  users: {}
};

export const actions = {
  [FETCH_USER_LOGIN] ({commit}, options) {
    makeCall(
      getEndPoints().users.login,
      buildOptions('POST', options.data), commit)
      .then(response => {
        if (response.statusCode === 'UNAUTHORIZED' && options.errorHandling) {
          options.errorHandling(response);
        } else if (options.callback) {
          const users = response;
          if (users && users.token) {
            const userInfo = {userId: users.userId, fullName: users.fullName, role: users.role};
            localStorage.setItem(localStorageKeys.USER, JSON.stringify(userInfo));
            localStorage.setItem(localStorageKeys.TOKEN, users.token);
            commit(SET_USER_LOGIN, {
              userId: users.userId,
              role: users.role
            });
          }
          options.callback(response);
        }
      }, error => {
        console.log('error =', error);
      });
  }
};

export const getters = {
  isLoggedIn: () => localStorage.getItem(localStorageKeys.TOKEN) && localStorage.getItem(localStorageKeys.TOKEN).length > 0 ? localStorage.getItem(localStorageKeys.TOKEN) : ''
};

export const mutations = {
  [SET_USER_LOGIN] (currentState, users) {
    currentState.users = users;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
