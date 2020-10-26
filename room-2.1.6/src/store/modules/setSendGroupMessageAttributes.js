const setSendGroupMessageAttributesModules = {
  state: {
    setSendGroupMessageAttributesVisible: false
  },
  mutations: {
    updateSendGroupMessageAttributesVisible(state, visible) {
      state.setSendGroupMessageAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setSendGroupMessageAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setSendGroupMessageAttributesModules
