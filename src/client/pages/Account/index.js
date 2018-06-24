import { h, Component } from 'preact'
import AuthPage from '../AuthPage'

class Account extends Component {
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

export default AuthPage(Account)
