const refreshTokenModules = {
  state: {
    refreshTokenModelVisible: false
  },
  mutations: {
    updateRefreshTokenModelVisible(state, visible) {
      state.refreshTokenModelVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        refreshTokenModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default refreshTokenModules
