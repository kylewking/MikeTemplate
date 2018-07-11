import Vue from 'vue'
import Vuex from 'vuex'


import mutations from './mutations'
import permission from './modules/permission'

import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
modules: {
   permission 
},
  getters,mutations
})
