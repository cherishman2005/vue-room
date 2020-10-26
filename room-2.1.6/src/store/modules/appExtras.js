const appExtrasModules = {
  state: {
    createAppExtrasVisible: false
  },
  mutations: {
    updateCreateAppExtrasVisible(state, visible) {
      state.createAppExtrasVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        createAppExtrasVisible: false
      })
    }
  },
  actions: {
  }
}

export default appExtrasModules
