const setSendSingleUserAttributesModules = {
  state: {
    setSendSingleUserAttributesVisible: false
  },
  mutations: {
    updateSendSingleUserAttributesVisible(state, visible) {
      state.setSendSingleUserAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setSendSingleUserAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setSendSingleUserAttributesModules
