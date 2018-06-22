import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'
import LoginForm from './LoginForm'
import { login } from '../../api/account'
import actions from '../../actions'

class Home extends Component {
  onLogin ({ email, password }) {
    return login(email, password)
  }

  onLoginError (error) {
    console.log(error)
  }

  render ({ account, login }) {
    return (
      <div class='fullscreen'>
        <h1>Draft Board</h1>
        <LoginForm
          onSubmit={this.onLogin}
          onSuccess={login}
          onError={this.onLoginError}
        />
      </div>
    )
  }
}

export default connect(
  'account',
  actions
)(Home)
