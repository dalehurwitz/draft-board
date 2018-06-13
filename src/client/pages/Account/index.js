import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'

class Account extends Component {
  componentDidMount () {
    if (!this.props.account.authenticated) {
      route('/', true)
    }
  }

  render ({ username }) {
    return (
      <div>
        <h1>Account Page</h1>
        <h2>User: {username}</h2>
        <h3>Draft list</h3>
      </div>
    )
  }
}

export default connect('account')(Account)
