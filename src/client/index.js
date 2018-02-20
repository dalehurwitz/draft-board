import { h, Component, render } from 'preact'
import Router from 'preact-router'
import './styles/main.scss'

import Home from './pages/Home'
import Draft from './pages/Draft'

class App extends Component {
  render () {
    return (
      <div>
        <a href='/'>Home</a>{' '}
        <a href='/draft'>Draft</a>
        <Router>
          <Home path='/' />
          <Draft path='/draft' />
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
