const channelModules = {
  state: {
    createChannelModelVisible: false
  },
  mutations: {
    updateCreateChannelModelVisible(state, visible) {
      state.createChannelModelVisible = visible
      //console.log('createChannelModelVisible=' + visible)
    },
    reset(state) {
      Object.assign(state, {
        createChannelModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default channelModules
