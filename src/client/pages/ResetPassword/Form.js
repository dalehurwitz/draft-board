import { h } from 'preact'
import form from '../../components/form/container'
import TextField from '../../components/form/TextField'
import { FIELD_ERRORS } from '../../config.json'

const ResetForm = ({ onInput, errors, values, loading }) => (
  <div>
    <h2>Reset Password</h2>
    <TextField
      type='password'
      name='password'
      id='password'
      label='Password'
      value={values.password}
      error={errors.password}
      onInput={onInput}
      required
    />
    <TextField
      type='password'
      name='passwordConfirm'
      id='passwordConfirm'
      label='Confirm Password'
      value={values.passwordConfirm}
      error={errors.passwordConfirm}
      onInput={onInput}
      pattern={`^${values.password}$`}
      required
    />
    <button type='submit' disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </div>
)

export default form(ResetForm, {
  fieldErrorMessages: FIELD_ERRORS.RESET
})
