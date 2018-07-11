import { constantRouterMap } from '@/router'
import store from '@/store'
import Layout from '@/components/common/Home.vue'

function getAddrouter(routers,permissions){
  let children = []
  for( let i=0;i<permissions.length;i++){
      let menu ={}
      if (permissions[i].children && permissions[i].children.length) {
        menu.component = Layout
        menu.path = '/'
        menu.children= getAddrouter(routers,permissions[i].children)
        routers.push(menu)
      }else{
        menu.path= permissions[i].url
        menu.meta={}
        menu.meta.auth= true
        menu.meta.title=permissions[i].name
        // menu.component = function(){return import(`@/view${permissions[i].path}.vue`) }
        menu.component = function(resolve){require(["@/view"+permissions[i].path+".vue"], resolve)}
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
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let { permissions } = data;
        let accessedRouters=[]
        getAddrouter(accessedRouters,permissions)
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission
