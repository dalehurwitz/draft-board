import { h } from 'preact'
import form from '../../components/form/container'
import TextField from '../../components/form/TextField'
import { FIELD_ERRORS } from '../../config.json'

const ForgotForm = ({ onInput, errors, values, loading }) => (
  <div>
    <h2>Forgot My Password</h2>
    <h3>
      Enter your email address and a password reset token will be delivered to
      you
    </h3>
    <TextField
      type='email'
      name='email'
      id='email'
      label='Email'
      value={values.email}
      error={errors.email}
      onInput={onInput}
      required
    />
    <button type='submit' disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </div>
)

export default form(ForgotForm, {
  fieldErrorMessages: FIELD_ERRORS.FORGOT
})
