import Vue from 'vue';
import Router from 'vue-router';
import localStorageKeys from '../store/local-storage-keys';

// Containers
import Full from '../containers/Full';

// Views
import Login from '../views/login/Login';
import routerKeys from '../store/router-keys';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: routerKeys.home.parent,
      component: Full,
      children: [
        {
          path: 'surveys',
          name: 'Survey',
          meta: { requiresAuth: true },
          component: {
            render (c) { return c('router-view'); }
          }
        }

      ]
    },
    {
      path: routerKeys.login,
      name: 'Login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.getItem(localStorageKeys.TOKEN)) {
    next({path: routerKeys.login, query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default router;
