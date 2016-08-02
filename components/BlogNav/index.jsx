import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import './style.css'

class BlogNav extends React.Component {
    render() {
        const {location} = this.props
        return (
            <nav className='nav'>
              <ul className='nav__list'>
                <li className={ location.pathname === prefixLink('/') ? "nav__elem nav__elem--current" : "nav__elem" }>
                  <Link className='nav__elem-link' title='Home page' to="/"> Home
                  </Link>
                </li>
                <li className={ location.pathname === prefixLink('/articles/') ? "nav__elem nav__elem--current" : "nav__elem" }>
                  <Link className='nav__elem-link' title='Articles' to='/articles/'> Articles
                  </Link>
                </li>
                <li className={ location.pathname === prefixLink('/contacts/') ? "nav__elem nav__elem--current" : "nav__elem" }>
                  <Link className='nav__elem-link' title='Contacts' to='/contacts/'> Contacts
                  </Link>
                </li>
              </ul>
            </nav>
            );
    }
}

BlogNav.propTypes = {
    location: React.PropTypes.object,
}

export default BlogNav