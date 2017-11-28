import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// import constants from '../../_consts';
// import {getEndPoint} from '../../utils/api-call';
// const _ = require('lodash');

Vue.use(VueAxios, axios);

const state = {
  listEvent: []
};

export default {
  state
};
