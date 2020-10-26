const roomAppExtrasModules = {
  state: {
    createRoomAppExtrasVisible: false
  },
  mutations: {
    updateCreateRoomAppExtrasVisible(state, visible) {
      state.createRoomAppExtrasVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createRoomAppExtrasVisible: false
      })
    }
  },
  actions: {
  }
}

export default roomAppExtrasModules
