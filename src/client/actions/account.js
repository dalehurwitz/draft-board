import {
  storeAccessToken,
  getStoredAccessToken,
  removeStoredAccessToken
} from '../utils'
import { check } from '../api/account'

const accountActions = {
  async init (state) {
    const accessToken = getStoredAccessToken()
    const defaultNewState = {
      ...state,
      account: {
        ...state.account,
        loading: false
      }
    }

    if (!accessToken) return defaultNewState

    const { authenticated, username } = await check(accessToken)

    if (!authenticated) return defaultNewState

    this.login({ accessToken, username })
  },
  login (state, { accessToken, username }) {
    storeAccessToken(accessToken)
    return {
      ...state,
      account: {
        authenticated: true,
        loading: false,
        accessToken,
        username
      }
    }
  },
  logout (state) {
    removeStoredAccessToken()
    return {
      ...state,
      account: {
        authenticated: false,
        loading: true,
        accessToken: null,
        username: null
      }
    }
  }
}

export default accountActions
