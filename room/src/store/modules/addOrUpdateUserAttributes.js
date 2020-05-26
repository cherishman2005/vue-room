const addOrUpdateUserAttributesModules = {
  state: {
    addOrUpdateUserAttributesVisible: false
  },
  mutations: {
    updateAddOrUpdateUserAttributesVisible(state, visible) {
      state.addOrUpdateUserAttributesVisible = visible
    },
    reset(state) {
      Object.assign(state, {
        addOrUpdateUserAttributesVisible: false
      })
    }
  },
  actions: {
  }
}

export default addOrUpdateUserAttributesModules
