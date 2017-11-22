export default {
  login: '/login',
  dashboard: {
    parent: '/',
    children: {
      employer: {
        parent: '/employers',
        children: {
          new: '/new'
        }
      }
    }
  }
};
