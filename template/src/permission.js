import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// permission judge function
function hasPermission(addRouters, title) {
  if (!title) return true
  if (title == '首页') return true
  let flag=false;
  for (var i = 0; i < addRouters.length;i++){
      if(addRouters[i].children && addRouters[i].children.length){
        flag= hasPermission(addRouters[i].children, title)
        if(flag) return flag
      }else{
        if(addRouters[i].meta.title==title){
          return true;
        }
      }
  }
  return flag
}

const whiteList = ['/login', '/404', '/403'] // no redirect whitelist

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (sessionStorage.isLogin == '1') { // 已经登陆 
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      if (store.getters.addRouters.length == 0) {
        const permissions = JSON.parse(sessionStorage.getItem('permission'));
        store.dispatch('GenerateRoutes', {permissions}).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })

      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (("title" in to.meta)&&hasPermission(store.getters.addRouters, to.meta.title)) {
          next() 
        } else  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          next({ path: '/404', replace: true })
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login', query: {redirect: to.fullPath}})
    }

  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
