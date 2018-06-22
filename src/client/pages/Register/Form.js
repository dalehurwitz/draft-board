import { h } from 'preact'
import form from '../../components/form/container'
import TextField from '../../components/form/TextField'
import { FIELD_ERRORS, REGEXP_PATTERNS } from '../../config.json'

const Register = ({ onInput, values, errors }) => {
  return (
    <div>
      <TextField
        type='text'
        name='username'
        id='username'
        label='Username'
        value={values.username}
        error={errors.username}
        onInput={onInput}
        pattern={REGEXP_PATTERNS.ALPHA_NUMERIC}
        required
      />
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
      <button type='submit'>Register</button>
    </div>
  )
}

export default form(Register, {
  fieldErrorMessages: FIELD_ERRORS.REGISTER
})
