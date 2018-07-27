import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import {
  commonRouterMap
} from 'base/router'

export const constantRouterMap = [{
  path: "/login",
  component: resolve => require(["../view/Login.vue"], resolve),
  meta: {
    auth: false,
    title: "登录"
  }
}].concat(commonRouterMap)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  mode: 'history',
  routes: constantRouterMap
});
