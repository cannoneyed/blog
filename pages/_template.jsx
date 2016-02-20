import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import '../static/fonts/proxima/stylesheet.css';
import ga from 'react-google-analytics';

export default class extends React.Component {
  render() {
  	var GAInitiailizer = ga.Initializer;
  	ga('create', 'UA-73379983-1', 'auto');
	ga('send', 'pageview');
    return (
      <div className='wrapper'>
        <RouteHandler {...this.props}/>
        <GAInitiailizer />
      </div>
    );
  }
}