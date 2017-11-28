const iconNames = {
  fileText: 'file-text-o',
  inbox: 'inbox',
  eye: 'eye',
  calendar: 'calendar-check-o',
  archive: 'archive',
  pencil: 'pencil',
  areaChart: 'area-chart',
  plusCircle: 'plus-circle',
  arrowCircleORight: 'arrow-circle-o-right',
  exchange: 'exchange',
  angleRight: 'angle-right',
  angleDoubleRight: 'angle-double-right',
  plus: 'plus',
  repeat: 'repeat',
  trashO: 'trash-o',
  chevronRight: 'chevron-right',
  refresh: 'refresh'
};

const LOCAL_STORE = {
  token: 'cc_token',
  pagingOptions: 'sof_pagingOptions'
};

export default {
  iconNames: iconNames,
  API_HOST: process.env.CLIENTCENTER_API_SERVER_HOST || 'http://localhost:8000',
  LOCAL_STORE: LOCAL_STORE
};
