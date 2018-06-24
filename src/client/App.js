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
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Draft from './pages/Draft'
import Create from './pages/Create/'

class App extends Component {
  componentDidMount () {
    this.props.init()
  }

  componentWillReceiveProps (nextProps) {
    const { authenticated, accessToken } = this.props.account

    if (
      // Redirect to account page if:
      // 1- We're logged in and try to return home
      (nextProps.account.authenticated && nextProps.route === '/') ||
      // 2- We've logged in or registered
      (!authenticated && nextProps.account.authenticated) ||
      // 3 - We've registered a new account while already logged in
      accessToken !== nextProps.account.accessToken
    ) {
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
          <Home path='/' default />
          <Account path='/account' />
          <Register path='/register' />
          <Draft path='/draft' />
          <Create path='/create' />
          <ForgotPassword path='/forgot' />
          <ResetPassword path='/reset/:token' />
        </Router>
      </div>
    )
  }
}

export default connect(
  'account, route',
  actions
)(App)
