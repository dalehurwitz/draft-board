import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { route } from 'preact-router'
import Form from './Form'
import { register } from '../../api/account'
import actions from '../../actions'

class Register extends Component {
  onSubmit = ({ username, email, password, passwordConfirm }) => {
    return register(username, email, password, passwordConfirm)
  }

  onSuccess = data => {
    this.props.setLoggedIn(data)
  }

  onError (error) {
    console.log(error)
  }

  render () {
    return (
      <div className='fullscreen'>
        <h2>Create an account</h2>
        <Form
          onSubmit={this.onSubmit}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      </div>
    )
  }
}

export default connect(
  'account',
  actions
)(Register)
