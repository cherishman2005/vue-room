import Vue from "vue"
import Vuex from "vuex"
import {getters} from "./getters";
import {mutations} from "./mutations";
import {actions} from './actions'

Vue.use(Vuex)

const state = {
  roomid: 0,
  userInfo: '',
  openId: '',
  scanAddress: '',
  score: 0
}

var store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
