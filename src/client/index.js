import { h, render } from 'preact'
import App from './App'

let root

function init () {
  root = render(<App />, document.getElementById('root'), root)
}

if (module.hot) {
  module.hot.accept('./App', init)
}

init()
