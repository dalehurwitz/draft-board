import { h, Component } from 'preact'
import Router from 'preact-router'
import './styles/main.scss'

import MainNav from './components/MainNav'
import Home from './pages/Home'
import Register from './pages/Register'
import Draft from './pages/Draft'
import Create from './pages/Create/'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <MainNav />
        <Router>
          <Home path='/' />
          <Register path='/register' />
          <Draft path='/draft' />
          <Create path='/create' />
        </Router>
      </div>
    )
  }
}

export default App
