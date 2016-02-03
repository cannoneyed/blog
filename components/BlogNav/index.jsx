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
            <a href="/about">Открыть обсуждение на Github</a>
          </li>
          <li>
            <a href="/themes">Где меня найти</a>
          </li>
          <li>
            <a href="/ask">Резюме</a>
          </li>
          <li>
            <a href="/rss">RSS</a>
          </li> 
        </ul>
      </nav>
    );
  }
}