import { h } from 'preact'
import form from '../../components/form/container'
import TextField from '../../components/form/TextField'
import { FIELD_ERRORS } from '../../config.json'

const Login = ({ onInput, values, loading, errors, submitError }) => {
  return (
    <div>
      <h2>Login</h2>
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
      <button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      <br />
      <a href='/forgot'>Forgot Password</a>
      {submitError && <p style={{color: 'red'}}>{submitError}</p>}
    </div>
  )
}

export default form(Login, {
  fieldErrorMessages: FIELD_ERRORS.LOGIN
})
