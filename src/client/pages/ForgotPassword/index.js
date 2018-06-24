import { h, Component } from 'preact'
import Form from './Form'
import { forgot } from '../../api/account'

class ForgotPassword extends Component {
  state = {
    info: null,
    error: false
  }

  onSubmit = ({ email }) => {
    return forgot(email)
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
      info: err
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

export default ForgotPassword
