import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

export default class extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
