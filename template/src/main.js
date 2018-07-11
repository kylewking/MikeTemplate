import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import axios from 'axios';
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import { Treeselect } from '@riophae/vue-treeselect';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import "babel-polyfill";
import './permission' // permission control

import qs from 'qs';
Vue.prototype.$qs = qs

Vue.use(ElementUI, { size: 'small' });
Vue.component("treeselect",Treeselect);

axios.defaults.withCredentials = false
axios.defaults.baseURL = '/Uip';
axios.defaults.emulateJSON = true
var qstr = require('querystring');
axios.interceptors.request.use((config) => {
  if (config.method == "post") {
    let strData=qstr.stringify(config.data);
    config.data =strData;
    config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
  }
  return config;
}, (error) => {
  Message.error('请求超时!');
  return Promise.reject(error);
});

axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error(data.data.message);
    return Promise.reject();
  }
  if (data.data && data.data.statusCode == '10000') {
    Message.error({message: data.data.message,duration:2000});
    sessionStorage.removeItem('isLogin')
    store.state.permission.addRouters = []
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permission');
    localStorage.removeItem('ms_username');
    // let tourl=data.config.url.slice(axios.defaults.baseURL.length);, query: {redirect: tourl}
    router.push({ path: '/login'})
    
    return Promise.reject();
  }
  // return Promise.resolve(data);
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Message.error("服务器被吃了⊙﹏⊙∥");
    router.push('/404');
  } else if (err.response.status == 403) {
    Message.error('权限不足,请联系管理员!');
  } else if (err.response.status == 302) {
    Message.error("权限不足,请联系管理员!");
  } else {
    Message.error("未知错误!");
    router.push('/403');
  }
  return  Promise.reject(error);
})
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
