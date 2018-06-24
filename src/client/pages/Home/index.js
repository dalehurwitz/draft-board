import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'
import LoginForm from './LoginForm'
import actions from '../../actions'
import { login } from '../../api/account'

class Home extends Component {
  onLogin = ({ email, password }) => {
    this.props.requestLogin()
    return login(email, password)
  }

  onLoginError (error) {
    console.error(error)
  }

  render ({ account, setLoggedIn }) {
    return (
      <div class='fullscreen'>
        <h1>Draft Board</h1>
        <LoginForm
          onSubmit={this.onLogin}
          onSuccess={this.props.setLoggedIn}
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
