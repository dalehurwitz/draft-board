import { h } from 'preact'

const Team = ({ name, onEdit, onDelete }) => {
  return (
    <li>
      <input type='text' value={name} onInput={onEdit} />
      <button onClick={onDelete}>X</button>
    </li>
  )
}

export default Team
