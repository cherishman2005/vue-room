const setSendTextExtAttributesModules = {
  state: {
    setSendTextExtAttributesVisible: false
  },
  mutations: {
    updateSendTextExtAttributesVisible(state, visible) {
      state.setSendTextExtAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setSendTextExtAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setSendTextExtAttributesModules
