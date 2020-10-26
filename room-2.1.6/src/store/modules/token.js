const tokenModules = {
  state: {
    selectTokenModelVisible: false
  },
  mutations: {
    updateSelectTokenModelVisible(state, visible) {
      state.selectTokenModelVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        selectTokenModelVisible: false
      })
    }
  },
  actions: {
  }
}

export default tokenModules
