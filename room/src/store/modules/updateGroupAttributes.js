const updateGroupAttributesModules = {
  state: {
    updateGroupAttributesVisible: false
  },
  mutations: {
    updateUpdateGroupAttributesVisible(state, visible) {
      state.updateGroupAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        updateGroupAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default updateGroupAttributesModules
