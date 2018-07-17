import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Layout from '@/components/common/Home.vue'

export const constantRouterMap=[
  {
      path: '/',
      redirect: "/index",
      component: Layout,
      children: [
       {
          path: "index",
          component: resolve =>require(["../view/index.vue"], resolve),
          meta: {
            auth: true,
            title: "首页"
          }
        }
      ]
    }, {
      path: "/login",
      component: resolve => require(["../view/Login.vue"], resolve),
      meta: {
        auth: false,
        title: "登录"
      }
    }, {
      path: "/404",
      component: resolve => require(["../components/page/404.vue"], resolve),
      meta: {
        auth: false
      }
    }, {
      path: "/403",
      component: resolve => require(["../components/page/403.vue"], resolve),
      meta: {
        auth: false
      }
    }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRouterMap
});
