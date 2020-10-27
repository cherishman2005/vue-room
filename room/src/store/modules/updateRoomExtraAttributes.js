const updateRoomExtraAttributesModules = {
  state: {
    updateRoomExtraAttributesVisible: false
  },
  mutations: {
    updateUpdateRoomExtraAttributesVisible(state, visible) {
      state.updateRoomExtraAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        updateRoomExtraAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default updateRoomExtraAttributesModules
