import { h } from 'preact'
import { Link } from 'preact-router/match'

const MainNav = () => {
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
      <Link
        className='main-nav__link'
        activeClassName='main-nav__link--active'
        href='/draft'
      >
        Draft
      </Link>
      <Link
        className='main-nav__link'
        activeClassName='main-nav__link--active'
        href='/create'
      >
        Create
      </Link>
    </nav>
  )
}

export default MainNav
