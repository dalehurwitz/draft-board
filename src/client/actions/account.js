import { storeAccessToken, getStoredAccessToken } from '../utils'

const accountActions = () => ({
  async init (state) {
    const accessToken = getStoredAccessToken()

    if (!accessToken) return state

    const { authenticated } = await verify(accessToken)
  },
  login ({ account, ...state }, { accessToken, username }) {
    storeAccessToken(accessToken)
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
