import { storeAccessToken, getStoredAccessToken } from '../utils'
import { check } from '../api/account'

const accountActions = () => ({
  async init (state) {
    const accessToken = getStoredAccessToken()

    if (!accessToken) return state

    const { authenticated, username } = await check(accessToken)

    if (!authenticated) return state

    this.login({ accessToken, username })
  },
  login (state, { accessToken, username }) {
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
