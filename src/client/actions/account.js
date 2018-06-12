const accountActions = () => ({
  login ({ account, ...state }, { accessToken, username }) {
    return {
      ...state,
      account: {
        authenticated: true,
        accessToken,
        username
      }
    }
  }
})

export default accountActions
