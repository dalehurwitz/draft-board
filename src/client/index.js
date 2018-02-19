import { h, Component } from 'preact'
import Router from 'preact-router'
import './styles/main.scss'

import Home from './pages/Home'
import Draft from './pages/Draft'

export default class App extends Component {
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
