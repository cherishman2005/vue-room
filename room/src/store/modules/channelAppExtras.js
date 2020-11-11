const channelAppExtrasModules = {
  state: {
    createChannelAppExtrasVisible: false
  },
  mutations: {
    updateCreateChannelAppExtrasVisible(state, visible) {
      state.createChannelAppExtrasVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createChannelAppExtrasVisible: false
      })
    }
  },
  actions: {
  }
}

export default channelAppExtrasModules
