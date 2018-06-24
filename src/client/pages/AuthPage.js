import { Component } from 'preact'
import { connect } from 'unistore/preact'
import { route } from 'preact-router'
import actions from '../actions'

function AuthPage (WrappedComponent) {
  class Page extends Component {
    componentDidMount () {
      this.handleLoggedOut(this.props.account)
    }

    componentWillReceiveProps (nextProps) {
      this.handleLoggedOut(nextProps.account)
    }

    handleLoggedOut ({ authenticated, loading }) {
      if (!authenticated && !loading) {
        route('/', true)
      }
    }

    render (props) {
      return <WrappedComponent {...props} />
    }
  }

  return connect(
    'account',
    actions
  )(Page)
}

export default AuthPage
