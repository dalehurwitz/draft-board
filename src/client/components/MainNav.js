import { h } from 'preact'
import { Link } from 'preact-router/match'
import { connect } from 'unistore/preact'
import actions from '../actions'

const MainNav = props => {
  return (
    <nav id='main-nav'>
      <Link
        className='main-nav__link'
        activeClassName='main-nav__link--active'
        href='/'
      >
        Home
      </Link>
      <Link
        className='main-nav__link'
        activeClassName='main-nav__link--active'
        href='/register'
      >
        Register
      </Link>
      {props.account.authenticated && [
        <Link
        className='main-nav__link'
        activeClassName='main-nav__link--active'
        href='/draft'
        >
          Draft
        </Link>,
        <Link
          className='main-nav__link'
          activeClassName='main-nav__link--active'
          href='/create'
        >
          Create
        </Link>,
        <button className='main-nav__link' onClick={props.logout}>
          Logout
        </button>
      ]}
    </nav>
  )
}

export default connect(
  'account',
  actions
)(MainNav)
