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
            <a href="/background.html">Мой бэкграунд</a>
          </li>
          <li>
            <a href="/getquote.html">Узнать ответ</a>
          </li>
          <li>
            <a href="/feed.xml">RSS Feed</a>
          </li> 
        </ul>
      </nav>
    );
  }
}