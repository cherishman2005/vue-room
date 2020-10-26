const addOrUpdateRoomAttributesModules = {
  state: {
    addOrUpdateRoomAttributesVisible: false
  },
  mutations: {
    updateAddOrUpdateRoomAttributesVisible(state, visible) {
      state.addOrUpdateRoomAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        addOrUpdateRoomAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default addOrUpdateRoomAttributesModules
