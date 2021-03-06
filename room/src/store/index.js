import Vue from "vue"
import Vuex from "vuex"
import {getters} from "./getters"
import {mutations} from "./mutations"
import {actions} from './actions'
import room from './modules/room'
import group from './modules/group'
import channel from './modules/channel'
import setGroupAttributes from './modules/setGroupAttributes'
import updateGroupAttributes from './modules/updateGroupAttributes'
import setGroupUserAttributes from './modules/setGroupUserAttributes'
import token from './modules/token'
import refreshToken from './modules/refreshToken'
import refreshToken1 from './modules/refreshToken1'
import appExtras from './modules/appExtras'
import roomAppExtras from './modules/roomAppExtras'
import peerAppExtras from './modules/peerAppExtras'
import channelAppExtras from './modules/channelAppExtras'
import setUserAttributes from './modules/setUserAttributes'
import addOrUpdateUserAttributes from './modules/addOrUpdateUserAttributes'
import setRoomAttributes from './modules/setRoomAttributes'
import addOrUpdateRoomAttributes from './modules/addOrUpdateRoomAttributes'
import setSendTextExtAttributes from './modules/setSendTextExtAttributes'
import setSendSingleUserAttributes from './modules/setSendSingleUserAttributes'
import setSendGroupMessageAttributes from './modules/setSendGroupMessageAttributes'
import setSendTextChatAttributes from './modules/setSendTextChatAttributes'
import joinChatRoomProps from './modules/joinChatRoomProps'
import setRoomExtraAttributes from './modules/setRoomExtraAttributes'
import updateRoomExtraAttributes from './modules/updateRoomExtraAttributes'

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
  channel,
  setGroupAttributes,
  updateGroupAttributes,
  setGroupUserAttributes,
  token,
  refreshToken,
  refreshToken1,
  appExtras,
  roomAppExtras,
  peerAppExtras,
  channelAppExtras,
  setUserAttributes,
  addOrUpdateUserAttributes,
  setRoomAttributes,
  addOrUpdateRoomAttributes,
  setSendTextExtAttributes,
  setSendSingleUserAttributes,
  setSendGroupMessageAttributes,
  setSendTextChatAttributes,
  joinChatRoomProps,
  setRoomExtraAttributes, // chatroom
  updateRoomExtraAttributes, // chatroom
};

var store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules,
  actions
})
export default store
