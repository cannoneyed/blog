import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import BlogNav from '../BlogNav';
import style from './style.css';

export default class extends React.Component {
  render() {
    let blogName, blogDescr, blogLogo;
    if (this.props.state.path === link('/')) {
      blogName = (
        <h1
          style={{
            color: 'rgba(255,255,255,1)',
            fontSize: '18px',
            lineHeight: '1',
            marginBottom: '5px',
            marginTop: '5px'
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
            to={link('/')}
          >
            {this.props.config.blogTitle}
          </Link>
        </h1>
      );
    } else {
      blogName = (
        <h3
          style={{
            color: 'rgba(255,255,255,1)',
            fontSize: '18px',
            lineHeight: '1',
            marginBottom: '5px',
            marginTop: '5px'
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
            to={link('/')}
          >
            {this.props.config.blogTitle}
          </Link>
        </h3>
      );
    }
    blogLogo = (
        <img
          src='./photo.png'
          width='60'
          height='60'
          style={{
            marginBottom: '30px',
            borderRadius: '50%',
            backgroundClip: 'padding-box'
          }}
        />
    );
    blogDescr = (
        <p>
          {this.props.config.blogDescr}
        </p>
    ); 
    return (
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='blog-details'>
            {blogLogo}
            <header>
              {blogName}
              {blogDescr}
            </header>
          </div>
          <div className='blog-options'>
            <BlogNav {...this.props}/>
            <footer>
            </footer>
          </div>
        </div>
        <div className='mask'></div>
      </div>
    );
  }
}