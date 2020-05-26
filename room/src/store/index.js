import Vue from "vue"
import Vuex from "vuex"
import {getters} from "./getters"
import {mutations} from "./mutations"
import {actions} from './actions'
import room from './modules/room'
import group from './modules/group'
import setGroupAttributes from './modules/setGroupAttributes'
import updateGroupAttributes from './modules/updateGroupAttributes'
import setGroupUserAttributes from './modules/setGroupUserAttributes'
import token from './modules/token'
import refreshToken from './modules/refreshToken'
import appExtras from './modules/appExtras'
import roomAppExtras from './modules/roomAppExtras'
import setUserAttributes from './modules/setUserAttributes'
import addOrUpdateUserAttributes from './modules/addOrUpdateUserAttributes'
import setRoomAttributes from './modules/setRoomAttributes'
import addOrUpdateRoomAttributes from './modules/addOrUpdateRoomAttributes'

Vue.use(Vuex)

const state = {
  roomid: 0,
  userInfo: '',
  openId: '',
  scanAddress: '',
  score: 0
}

const modules = { 
  room,
  group,
  setGroupAttributes,
  updateGroupAttributes,
  setGroupUserAttributes,
  token,
  refreshToken,
  appExtras,
  roomAppExtras,
  setUserAttributes,
  addOrUpdateUserAttributes,
  setRoomAttributes,
  addOrUpdateRoomAttributes
};

var store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules,
  actions
})
export default store
