import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import Form from './Form'
import { reset } from '../../api/account'

class ResetPassword extends Component {
  state = {
    success: null,
    message: null
  }

  onSubmit = ({ password, passwordConfirm }) => {
    return reset(this.props.token, password, passwordConfirm)
  }

  onSuccess = ({ message }) => {
    this.setState({
      success: true,
      message
    })
  }

  renderPage () {
    if (this.state.success) {
      return (
        <div>
          <h3>{this.state.message}</h3>
          <Link href='/'>
            Login
          </Link>
        </div>
      )
    }

    return (
      <Form
        onSubmit={this.onSubmit}
        onSuccess={this.onSuccess}
      />
    )
  }

  render (props, state) {
    return (
      <div className='fullscreen'>
        {this.renderPage()}
      </div>
    )
  }
}

export default ResetPassword
