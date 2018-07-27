import {
  constantRouterMap
} from '@/router'
import Layout from 'base/view/common/Home.vue'
import lazyLoading from 'base/public/javascripts/lazyLoading'

//import commuip from 'commuip/index.js'
//import commuam from 'commuam/index.js'

function getAddrouter(routers, permissions) {
  let children = []
  for (let i = 0; i < permissions.length; i++) {
    let menu = {}
    if (permissions[i].children && permissions[i].children.length) {
      menu.component = Layout
      menu.path = '/'
      menu.children = getAddrouter(routers, permissions[i].children)
      routers.push(menu)
    } else {
      menu.path = permissions[i].url
      menu.meta = {}
      menu.meta.auth = true
      menu.meta.title = permissions[i].name
      // menu.component = function(){return import(`@/view${permissions[i].path}.vue`) }
      // menu.component = function(resolve){require([permissions[i].path+".vue"], resolve)
      menu.component = lazyLoading(permissions[i].path)

      // if (commuip[permissions[i].path]) {
      //   menu.component = commuip[permissions[i].path]
      // } else if (commuam[permissions[i].path]) {
      //   menu.component = commuam[permissions[i].path]
      // } else {
      //   menu.component = lazyLoading(permissions[i].path)
      // }
      children.push(menu)
    }
  }
  return children;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        let {
          permissions
        } = data;
        let accessedRouters = []
        getAddrouter(accessedRouters, permissions)
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission
