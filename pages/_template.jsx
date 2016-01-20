import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import '../css/styles.css';

export default class extends React.Component {
  render() {
    let header;
    if (this.props.state.path === link('/')) {
      header = (
        <h1>
          <Link
            to={link('/')}
          >
            {this.props.config.blogTitle}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3>
          <Link
            to={link('/')}
          >
            {this.props.config.blogTitle}
          </Link>
        </h3>
      );
    }
    return (
      <div>
        {header}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
