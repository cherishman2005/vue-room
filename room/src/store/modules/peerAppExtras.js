const peerAppExtrasModules = {
  state: {
    createPeerAppExtrasVisible: false
  },
  mutations: {
    updateCreatePeerAppExtrasVisible(state, visible) {
      state.createPeerAppExtrasVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createPeerAppExtrasVisible: false
      })
    }
  },
  actions: {
  }
}

export default peerAppExtrasModules
