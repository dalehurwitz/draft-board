import createStore from 'unistore'

const initialState = {
  account: {
    authenticated: false,
    loading: true
  },
  route: '/'
}

export default createStore(initialState)
