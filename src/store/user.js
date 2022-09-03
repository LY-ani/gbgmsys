const Cookie = require('js-cookie');
export default {
  state: {
    user: {},
  },
  mutations: {
    getUser(state) {
      state.user =
        JSON.stringify(state.user) == '{}'
          ? JSON.parse(Cookie.get('userinfo'))
          : state.user;
    },
    setUser(state, val) {
      state.user = {};
      Cookie.set('userinfo', JSON.stringify(val));
    },
    removeUser(state) {
      state.user = {};
      Cookie.remove('userinfo');
    },
  },
};
