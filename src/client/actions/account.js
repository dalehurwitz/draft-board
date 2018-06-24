import {
  storeAccessToken,
  getStoredAccessToken,
  removeStoredAccessToken
} from '../utils'
import { login, check } from '../api/account'

const accountActions = store => ({
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

    this.setLoggedIn({ accessToken, username })
  },
  requestLogin (state) {
    store.setState({
      ...state,
      account: {
        ...state.account,
        loading: true
      }
    })
  },
  setLoggedIn (state, { accessToken, username }) {
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
        loading: false,
        accessToken: null,
        username: null
      }
    }
  }
})

export default accountActions
