const accountActions = () => ({
  login ({ account, ...state }, { accessToken, username }) {
    return {
      ...state,
      account: {
        accessToken,
        username
      }
    }
  }
})

export default accountActions
