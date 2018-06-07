import { h, Component } from 'preact'
import Form from './Form'
import { register } from '../../api/account'

class Register extends Component {
  onSubmit = ({ username, email, password, passwordConfirm }) => {
    return register(username, email, password, passwordConfirm)
  }

  onSuccess (data) {
    console.log(data)
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

export default Register
