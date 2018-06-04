import { h } from 'preact'
import form from '../../components/form'

const Register = ({ onChange, onSubmit, errors }) => {
  return (
    <div>
      <h2>Register</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        onChange={onChange}
        required
        novalidate
      />
      <button type='submit'>Submit</button>
      <pre>
        {JSON.stringify(errors)}
      </pre>
    </div>
  )
}

export default form(Register)
