import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getter'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)



const store = new Vuex.Store({
    /**
   * 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
   * 这能保证所有的状态变更都能被调试工具跟踪到。
   * 发布模式下不能使用严格模式因为会降低性能
   */
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})

export default store
