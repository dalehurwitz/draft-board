import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import LoginForm from './LoginForm'
import actions from '../../actions'
import { login } from '../../api/account'

class Home extends Component {
  onLogin = ({ email, password }) => {
    this.props.requestLogin()
    return login(email, password)
  }

  render ({ account, setLoggedIn }, state) {
    return (
      <div class='fullscreen'>
        <h1>Draft Board</h1>
        <LoginForm
          onSubmit={this.onLogin}
          onSuccess={this.props.setLoggedIn}
        />
      </div>
    )
  }
}

export default connect(
  'account',
  actions
)(Home)
