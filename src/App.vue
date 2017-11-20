<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import localStorageKeys from './store/local-storage-keys';
import routerKeys from './store/router-keys';
import globalMessage from './store/message';
export default {
  name: 'app',
  beforeMount () {
    Vue.axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(localStorageKeys.TOKEN, '');
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
