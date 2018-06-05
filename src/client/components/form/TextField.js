import { h } from 'preact'

const TextField = ({
  name,
  id,
  type,
  label,
  value,
  onInput,
  error,
  ...rest
}) => (
  <div>
    <label htmlFor={id}>{label} </label>
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onInput={onInput}
      {...rest}
    />
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </div>
)

export default TextField
