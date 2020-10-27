const setRoomExtraAttributesModules = {
  state: {
    setRoomExtraAttributesVisible: false
  },
  mutations: {
    updateSetRoomExtraAttributesVisible(state, visible) {
      state.setRoomExtraAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setRoomExtraAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setRoomExtraAttributesModules
