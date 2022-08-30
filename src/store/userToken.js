const Cookie = require('js-cookie');
export default {
  state: {
    token: '',
  },
  mutations: {
    // setToken(state, val) {
    //   state.token = val;
    //   localStorage.setItem('token', val);
    // },
    // removeToken(state) {
    //   state.token = '';
    //   localStorage.removeItem('token');
    // },
    // getToken(state) {
    //   state.token = state.token || localStorage.getItem('token');
    // },
    setToken(state, val) {
      state.token = val;
      // 25s过期
      // let seconds = 25;
      // let expires = new Date(new Date() * 1 + seconds * 1000);
      let hour = 9.5;
      let expires = new Date(new Date() * 1 + hour * 60 * 60 * 1000);
      Cookie.set('token', val, { expires: expires });
    },
    removeToken(state) {
      state.token = '';
      Cookie.remove('token');
    },
    getToken(state) {
      state.token = state.token || Cookie.get('token');
    },
  },
};
