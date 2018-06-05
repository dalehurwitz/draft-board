import { h } from 'preact'
import form from '../../components/form/container'
import TextField from '../../components/form/TextField'
import { register } from '../../api/account'

const Register = ({ onInput, values, errors }) => {
  return (
    <div>
      <h2>Register</h2>
      <TextField
        type='text'
        name='username'
        id='username'
        label='Username'
        value={values.username}
        error={errors.username}
        onInput={onInput}
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
        required
      />
      <button type='submit'>Submit</button>
    </div>
  )
}

export default form(Register, {
  onSubmit (values) {
    return register(
      values.username,
      values.email,
      values.password,
      values.passwordConfirm
    )
  },
  onSuccess (data) {
    console.log(data)
  },
  onError (error) {
    console.log(error)
  }
})
