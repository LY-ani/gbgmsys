import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 导入配置过的axios插件
import axios from './plugins/axios';
Vue.prototype.axios = axios;

// 设置前置路由
router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.userToken.token;
  // console.log(token);
  if (!token && to.path !== '/login' && to.path !== '/register') {
    next({ path: '/login' });
  } else if (token && to.path === '/login') {
    next({ path: '/' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router);
  },
}).$mount('#app');
