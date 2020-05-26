const setGroupUserAttributesModules = {
  state: {
    setGroupUserAttributesVisible: false
  },
  mutations: {
    updateSetGroupUserAttributesVisible(state, visible) {
      state.setGroupUserAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setGroupUserAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setGroupUserAttributesModules
