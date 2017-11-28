<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import routerKeys from './store/router-keys';
import globalMessage from './store/message';
import constants from '@/_consts';

export default {
  name: 'app',
  beforeMount () {
    Vue.axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(constants.LOCAL_STORE.token, '');
        this.$modal.show('dialog', {
          title: globalMessage.dialog.unAuthorizedToken.title,
          text: globalMessage.dialog.unAuthorizedToken.msg,
          buttons: [
            { title: globalMessage.common.yes,
              handler: () => {
                this.$modal.hide('dialog');
                this.$router.push(routerKeys.login);
              }
            }
          ]
        });
      } else {
        return Promise.reject(error);
      }
    });
  }
};
</script>

<style>
</style>
