import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';

export default class extends React.Component {
  render() {
    let menu, menuItem;

    return (
      <nav className='blog-nav'>
        <ul>
          <li>
            <a href="/archive">Archive</a>
          </li>
          <li>
            <a href="/ask">Ask me anything</a>
          </li>
          <li>
            <a href="/themes">More themes</a>
          </li>
          <li>
            <a href="/buy">Buy this theme</a>
          </li> 
        </ul>
      </nav>
    );
  }
}