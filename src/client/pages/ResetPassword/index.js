import { h, Component } from 'preact'
import Form from './Form'
import { reset } from '../../api/account'

class ResetPassword extends Component {
  state = {
    info: null,
    error: false
  }

  onSubmit = ({ password, passwordConfirm }) => {
    return reset(this.props.token, password, passwordConfirm)
  }

  onSuccess = ({ message }) => {
    this.setState({
      error: false,
      info: message
    })
  }

  onError = err => {
    this.setState({
      error: true,
      info: message
    })
  }

  render (props, state) {
    return (
      <div className='fullscreen'>
        <Form
          onSubmit={this.onSubmit}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
        {state.info && (
          <p style={{ color: state.error ? 'red' : 'green' }}>{state.info}</p>
        )}
      </div>
    )
  }
}

export default ResetPassword
