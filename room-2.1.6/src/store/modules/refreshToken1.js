const refreshToken1Modules = {
  state: {
    refreshToken1ModelVisible: false
  },
  mutations: {
    updateRefreshToken1ModelVisible(state, visible) {
      state.refreshToken1ModelVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        refreshToken1ModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default refreshToken1Modules
