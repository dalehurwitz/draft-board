import { h, Component } from 'preact'
import Router, { route } from 'preact-router'
import { connect } from 'unistore/preact'
import actions from './actions'
import './styles/main.scss'

// Pages
import MainNav from './components/MainNav'
import Home from './pages/Home'
import Account from './pages/Account'
import Register from './pages/Register'
import Draft from './pages/Draft'
import Create from './pages/Create/'

class App extends Component {
  componentDidMount () {
    this.props.init()
  }

  componentWillReceiveProps (nextProps) {
    const { authenticated, loading } = this.props.account
    // Redirect to account page when we've logged in
    if (nextProps.account.authenticated && nextProps.route === '/') {
      return route('/account', true)
    }

    // if (authenticated && !nextProps.authenticated) {
    //   route('/')
    // }
  }

  onRouteChange = e => {
    if (e.url !== this.props.url) {
      this.props.changeRoute(e.url)
    }
  }

  render () {
    return (
      <div className='app'>
        <MainNav />
        <Router onChange={this.onRouteChange}>
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

export default connect(
  'account, route',
  actions
)(App)
