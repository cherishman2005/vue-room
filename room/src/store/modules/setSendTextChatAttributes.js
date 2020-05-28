const setSendTextChatAttributesModules = {
  state: {
    setSendTextChatAttributesVisible: false
  },
  mutations: {
    updateSendTextChatAttributesVisible(state, visible) {
      state.setSendTextChatAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        setSendTextChatAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default setSendTextChatAttributesModules
