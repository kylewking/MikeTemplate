import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import axios from 'axios';
import {
  Message
} from 'element-ui';
axios.defaults.withCredentials = false
axios.defaults.baseURL = '/Uip';
axios.defaults.emulateJSON = true
var qstr = require('querystring');
axios.interceptors.request.use((config) => {
  if (config.method == "post") {
    let strData = qstr.stringify(config.data);
    config.data = strData;
    config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
  }
  return config;
}, (error) => {
  Message.error('请求超时!');
  return Promise.reject(error);
});

axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error(data.data.message);
    return Promise.reject();
  }
  if (data.data && data.data.statusCode == '10000') {
    Message.error({
      message: data.data.message,
      duration: 2000
    });
    sessionStorage.removeItem('isLogin')
    store.state.permission.addRouters = []
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permission');
    localStorage.removeItem('ms_username');
    // let tourl=data.config.url.slice(axios.defaults.baseURL.length);, query: {redirect: tourl}
    router.push({
      path: '/login'
    })

    return Promise.reject();
  }
  // return Promise.resolve(data);
  return data;
}, err => {
  if (err.response.status == 504 || err.response.status == 404) {
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
  return Promise.reject(error);
})
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios = axios;


NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// permission judge function
function hasPermission(addRouters, title) {
  if (!title) return true
  if (title == '首页') return true
  let flag = false;
  for (var i = 0; i < addRouters.length; i++) {
    if (addRouters[i].children && addRouters[i].children.length) {
      flag = hasPermission(addRouters[i].children, title)

      if (flag) return flag
    } else {
      if (addRouters[i].meta.title == title) {
        return true;
      }
    }
  }
  return flag
}

const whiteList = ['/login', '/404', '/403'] // no redirect whitelist


router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (sessionStorage.isLogin == '1') { // 已经登陆 
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length == 0) {
        const permissions = JSON.parse(sessionStorage.getItem('permission'));
        store.dispatch('GenerateRoutes', {
          permissions
        }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({ ...to,
            replace: true
          }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (("title" in to.meta) && hasPermission(store.getters.addRouters, to.meta.title)) {
          if (to.matched.some(record => record.meta.auth)) {
            next()
          }
        } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          next({
            path: '/404',
            replace: true
          })
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }

  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
