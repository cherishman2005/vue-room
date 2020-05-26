const setGroupAttributesModules = {
  state: {
    setGroupAttributesVisible: false
  },
  mutations: {
    updateSetGroupAttributesVisible(state, visible) {
      state.setGroupAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setGroupAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setGroupAttributesModules
