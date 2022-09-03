import axios from 'axios';
import qs from 'qs';
import store from '../store';
// 是否允许请求携带Cookie
// axios.defaults.withCredentials = true;
// 后台服务器地址
axios.defaults.baseURL = 'http://localhost:3000';

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // console.log('formdata', config.data instanceof FormData);
    // console.log(config);
    store.commit('getToken');
    const token = store.state.userToken.token;
    // console.log('axios token', token);
    if (token) {
      config.headers.Authorization = token;
    }
    if (config.method === 'post' && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

      // 后端要求传数组的时候做的设置
      // console.log(config.data);
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat',
      });
      // console.log(config.data);
    } else if (config.method === 'post' && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (err) => {
    return err;
  }
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    /* 对返回的数据进行处理 */
    return res;
  },
  (err) => {
    return err;
  }
);

// 导出
export default axios;
