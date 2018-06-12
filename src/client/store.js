import createStore from 'unistore'

const initialState = {
  account: {
    authenticated: false
  }
}

export default createStore(initialState)
