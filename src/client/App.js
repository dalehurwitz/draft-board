import { h, Component } from 'preact'
import Router from 'preact-router'
import './styles/main.scss'

import Home from './pages/Home'
import Draft from './pages/Draft'
import Create from './pages/Create/'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <nav style={{ position: 'absolute', zIndex: '99', top: 0 }}>
          <a href='/'>Home</a> <a href='/draft'>Draft</a>{' '}
          <a href='/create'>Create</a>
        </nav>
        <Router>
          <Home path='/' />
          <Draft path='/draft' />
          <Create path='/create' />
        </Router>
      </div>
    )
  }
}

export default App
