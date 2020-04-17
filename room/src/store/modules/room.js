const roomModules = {
  state: {
    createRoomModelVisible: false
  },
  mutations: {
    updateCreateRoomModelVisible(state, visible) {
      state.createRoomModelVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createRoomModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default roomModules
