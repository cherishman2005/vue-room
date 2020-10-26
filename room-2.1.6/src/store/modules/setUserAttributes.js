const setUserAttributesModules = {
  state: {
    setUserAttributesVisible: false
  },
  mutations: {
    updateSetUserAttributesVisible(state, visible) {
      state.setUserAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setUserAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setUserAttributesModules
