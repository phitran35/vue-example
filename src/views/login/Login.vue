<template>
  <div class="app flex-row align-items-center">
    <vue-progress-bar></vue-progress-bar>
    <Toastr ref="toastr"></Toastr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><Icon name="user-o"></Icon></span>
                  <input type="text" class="form-control" placeholder="Username" v-model="userForm.username">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><Icon name="lock"></Icon></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="userForm.password">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="handleLoginButtonClick()">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card text-white bg-primary py-5 d-md-down-none hidden" style="width:44%">
              <div class="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button type="button" class="btn btn-primary active mt-3">Register Now!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toastr from 'vue-toastr';
import { mapActions } from 'vuex';
import 'vue-awesome/icons/lock';
import 'vue-awesome/icons/user-o';
import Icon from 'vue-awesome/components/Icon';
import routerKeys from '../../store/router-keys';
import {
  FETCH_USER_LOGIN
} from '../../store/modules/users/constants';

export default {
  name: 'Login',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    };
  },
  components: {
    Icon,
    Toastr
  },
  methods: {
    handleLoginButtonClick () {
      const payload = {
        data: {
          username: this.userForm.username,
          password: this.userForm.password
        },
        callback: this.onLoginSuccess,
        errorHandling: this.onLoginFailure
      };
      this.$Progress.start();
      this.login(payload);
    },
    onLoginFailure (error) {
      this.$Progress.finish();
      this.$refs.toastr.e(error.message ? error.message : 'Unknow Error!');
    },
    onLoginSuccess (user) {
      this.$Progress.finish();
      console.log(routerKeys);
      this.$router.push(routerKeys.dashboard.children.employer.parent);
    },
    ...mapActions({
      login: FETCH_USER_LOGIN
    })
  }
};
</script>
<style scoped>
  .hidden {
    display: none;
  }
</style>
