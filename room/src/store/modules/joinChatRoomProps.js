const joinChatRoomPropsModules = {
  state: {
    joinChatRoomPropsVisible: false
  },
  mutations: {
    updateJoinChatRoomPropsVisible(state, visible) {
      state.joinChatRoomPropsVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        joinChatRoomPropsVisible: false
      })
    }
  },
  actions: {
  }
}

export default joinChatRoomPropsModules
