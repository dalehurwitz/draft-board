import { h } from 'preact'
import { Provider } from 'unistore/preact'
import App from './App'
import store from './store'

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
