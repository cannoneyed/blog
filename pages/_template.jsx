import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import SidebarLeft from '../components/SidebarLeft';
import BlogContent from '../components/BlogContent';

export default class extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <SidebarLeft {...this.props}/>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
