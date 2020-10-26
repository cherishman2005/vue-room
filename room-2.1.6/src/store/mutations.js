export const mutations = {
  //用户信息
  setUserInfo(state, info) {
    //alert("setUserInfo: " + JSON.stringify(info));
    info ? state.userInfo = Object.assign(state.userInfo, info) : state.userInfo = null

  },
  // recordUser(state, info) {
  //   state.userInfo = info
  //   localStorage.setItem('user_id', info.user_id)
  // },
  clearUser(state) {
    state.userInfo = '';
    localStorage.removeItem('user_id');
  },
  setScanAddress(state, address) {
    //address ? state.scanAddress = Object.assign(state.scanAddress, address) : state.scanAddress = null
    state.scanAddress = address;
    alert("scanAddress: " + scanAddress);
  },
  setOpenId(state, openid) {
    state.openId = openid;
  },
  setScore(state, score) {
    state.score = score;
  },

}
