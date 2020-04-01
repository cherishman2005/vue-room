const groupModules = {
  state: {
    createGroupModelVisible: false
  },
  mutations: {
    updateCreateGroupModelVisible(state, visible) {
      state.createGroupModelVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createGroupModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default groupModules
