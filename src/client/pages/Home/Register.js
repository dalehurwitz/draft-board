import { h } from 'preact'
import form from '../../components/form'

const Register = ({ onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        onChange={onChange}
        required
        novalidate
      />
      <button type='submit'>"Submit"</button>
    </form>
  )
}

export default form(Register)
