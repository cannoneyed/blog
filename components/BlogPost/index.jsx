import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';

export default class extends React.Component {
  render() {
    return (
      <div className='blog-post'>
        <time>time</time>
        <span className='blog-category'>category</span>
        <h2>title</h2>
      </div>
    );
  }
}