// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// load (Polyfill) EventSource, in case browser does not support it...
import 'babel-polyfill';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';
import VModal from 'vue-js-modal';

import BootstrapVue from 'bootstrap-vue';
import VueProgressBar from 'vue-progressbar';
import App from './App';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toastr/dist/vue-toastr.css';
import '@/vendors/custom-tree-components/tree.min.css';
import '../static/css/style.css';
require('moment-duration-format');

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueProgressBar, {
  color: 'rgb(0, 181, 230)',
  failedColor: 'red',
  height: '2px'
});
Vue.use(VModal, {dialog: true});

Vue.config.productionTip = false;

Vue.filter('date', date => moment(date).format('yyyy-MM-dd'));
Vue.filter('textEllipsis', text => {
  const max = 60;
  if (text.length <= max) {
    return text;
  } else {
    return text.substring(0, (max + 1)) + '...';
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store
});
