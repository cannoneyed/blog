import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import './style.css';

class BlogNav extends React.Component {
  render() {
    return (
      <nav className='blog-nav'>
        <ul>
          <li>
            <Link to="/background">Background</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BlogNav