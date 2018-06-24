const routerActions = store => ({
  changeRoute (state, route) {
    return {
      ...state,
      route
    }
  }
})

export default routerActions
