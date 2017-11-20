<template>
  <div class="app">
    <Toastr ref="toastr"></Toastr>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
    <v-dialog
      @closed="beforeDialogClose"
    />
  </div>
</template>

<script>
  import Toastr from 'vue-toastr';
  import { mapGetters } from 'vuex';
  import nav from '../_nav';
  import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/';
  import { EventBus } from '../event-bus';

  import routerKeys from '../store/router-keys';
  import localStorageKeys from '../store/local-storage-keys';

  import {
    EVENT_TOAST_MESSAGE,
    EVENT_ERROR_TOAST_MESSAGE,
    EVENT_WARNING_TOAST_MESSAGE
  } from '../store/events';

  export default {
    name: 'full',
    created () {
      EventBus.$on(EVENT_TOAST_MESSAGE, function (msg) {
        this.$refs.toastr.s(msg);
      }.bind(this));
      EventBus.$on(EVENT_ERROR_TOAST_MESSAGE, function (msg) {
        this.$refs.toastr.e(msg);
      }.bind(this));
      EventBus.$on(EVENT_WARNING_TOAST_MESSAGE, function (msg) {
        this.$refs.toastr.w(msg);
      }.bind(this));
    },
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb,
      Toastr
    },
    data () {
      return {
        nav: nav.items,
        modalOptions: {
          title: '',
          message: ''
        },
        loading: false
      };
    },
    computed: {
      name () {
        return this.$route.name;
      },
      list () {
        return this.$route.matched;
      },
      ...mapGetters({
        isLoading: 'isLoading'
      })
    },
    methods: {
      beforeDialogClose () {
        const token = localStorage.getItem(localStorageKeys.TOKEN);
        if (!token) {
          this.$router.push(routerKeys.login);
        }
      }
    },
    watch: {
      isLoading (newLoading) {
        if (newLoading) {
          this.$Progress.start();
        } else {
          this.$Progress.finish();
        }
      }
    }
  };
</script>
<style>
  .btn-hover-info, .btn-hover-success, .btn-hover-danger, .btn-hover-primary {
    transition: all 0.3s ease 0s; }

  .btn-hover-info:hover {
    box-shadow: 0 0 0 2px #23b7e5;
    border-color: #23b7e5;
    background: #fff; }

  .btn-hover-success:hover {
    box-shadow: 0 0 0 2px #27c24c;
    border-color: #27c24c;
    background: #fff; }

  .btn-hover-danger:hover {
    box-shadow: 0 0 0 2px #ee3939;
    border-color: #ee3939;
    background: #fff; }

  .btn-hover-primary:hover {
    box-shadow: 0 0 0 2px #7266ba;
    border-color: #7266ba;
    background: #fff; }

  .vue-dialog button {
    font-size: 14px;
    font-weight: 500;
  }

  .vue-dialog button:first-child {
    background: #f05050;
    color: white;
  }

  .vue-dialog button:first-child:hover {
    background: #dc3545;
  }

  .col-legend-paths {
    width: 300px;
  }

</style>
