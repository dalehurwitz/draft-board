import { h, render } from 'preact'
import { Provider } from 'unistore/preact'
import App from './App'
import store from './store'

let root

function init () {
  root = render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
    root
  )
}

if (module.hot) {
  module.hot.accept('./App', init)
}

init()
