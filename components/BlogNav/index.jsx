import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import './style.css'

class BlogNav extends React.Component {
    render() {
        const {location} = this.props
        return (
            <nav className='blog-nav'>
              <ul>
                <li>
                  <Link to="/" className={ location.pathname === prefixLink('/') ? "current" : null }> Home
                  </Link>
                </li>
                <li>
                  <Link to="/background" className={ location.pathname === prefixLink('/background') ? "current" : null }> Background
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className={ location.pathname === prefixLink('/contacts') ? "current" : null }> Contacts
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