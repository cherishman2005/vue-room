const setRoomAttributesModules = {
  state: {
    setRoomAttributesVisible: false
  },
  mutations: {
    updateSetRoomAttributesVisible(state, visible) {
      state.setRoomAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setRoomAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setRoomAttributesModules
