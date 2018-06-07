import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import LoginForm from './LoginForm'
import { login } from '../../api/account'
import { accountActions } from '../../actions'

class Home extends Component {
  onLogin ({ email, password }) {
    return login(email, password)
  }

  onLoginSuccess = data => {
    this.props.login(data)
  }

  onLoginError (error) {
    console.log(error)
  }

  render ({ account }) {
    return (
      <div class='fullscreen'>
        <h1>Draft Board</h1>
        <LoginForm
          onSubmit={this.onLogin}
          onSuccess={this.onLoginSuccess}
          onError={this.onLoginError}
        />
      </div>
    )
  }
}

export default connect('account', accountActions)(Home)
