import Vue from 'vue';
import Router from 'vue-router';
import localStorageKeys from '../store/local-storage-keys';

// Containers
import Employer from '../views/employers/Employer';
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
      name: 'Dashboard',
      redirect: routerKeys.dashboard.children.employer.parent,
      component: Full,
      children: [
        {
          path: '/employers',
          name: 'Employer',
          meta: { requiresAuth: true },
          component: {
            render (c) { return c('router-view'); }
          },
          children: [
            {
              path: '',
              name: 'Employer List',
              component: Employer
            }
          ]
        },
        {
          path: '/employees',
          name: 'Employee',
          meta: { requiresAuth: true },
          component: {
            render (c) { return c('router-view'); }
          },
          children: [
            {
              path: '',
              name: 'Employee List',
              component: Employer
            }
          ]
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
