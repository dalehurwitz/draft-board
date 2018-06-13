import { h, Component } from 'preact'
import Router, { route } from 'preact-router'
import { connect } from 'unistore/preact'
import './styles/main.scss'

import { getStoredAccessToken } from './utils'

// Pages
import MainNav from './components/MainNav'
import Home from './pages/Home'
import Account from './pages/Account'
import Register from './pages/Register'
import Draft from './pages/Draft'
import Create from './pages/Create/'

class App extends Component {
  componentDidMount () {
    const token = getStoredAccessToken()
  }

  render () {
    return (
      <div className='app'>
        <MainNav />
        <Router>
          <Home path='/' />
          <Account path='/account' />
          <Register path='/register' />
          <Draft path='/draft' />
          <Create path='/create' />
        </Router>
      </div>
    )
  }
}

export default connect('account')(App)
