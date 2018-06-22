import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'

class Account extends Component {
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

  render ({ account }) {
    if (account.loading) return 'Loading...'

    return (
      <div>
        <h1>Account Page</h1>
        <h2>User: {account.username}</h2>
        <h3>Draft list</h3>
      </div>
    )
  }
}

export default connect('account')(Account)
