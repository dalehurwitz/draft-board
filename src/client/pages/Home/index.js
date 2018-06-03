import { h, Component } from 'preact'
import Register from './Register'

class Home extends Component {
  render () {
    return (
      <div>
        <h1>Draft Board</h1>
        <Register />
      </div>
    )
  }
}

export default Home
