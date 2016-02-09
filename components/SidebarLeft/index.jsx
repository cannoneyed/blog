import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import BlogNav from '../BlogNav';
import BlogSocial from '../BlogSocial';
import style from './style.css';

export default class extends React.Component {
  render() {
    let blogName, blogDescr, blogLogo;
    if (this.props.state.path === link('/')) {
      blogName = (
        <h1>
          <Link
            style={{
              textDecoration: 'none',
              borderBottom: 'none',
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
        <h2>
          <Link
            style={{
              textDecoration: 'none',
              borderBottom: 'none',
              color: 'inherit'
            }}
            to={link('/')}
          >
            {this.props.config.blogTitle}
          </Link>
        </h2>
      );
    }
    blogLogo = (
        <img
          src='./photo.png'
          width='60'
          height='60'
          style={{
            marginBottom: '15px',
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
            <header>
              {blogName}
              {blogDescr}
            </header>
          </div>
          <div className='blog-options'>
            <BlogNav {...this.props}/>
            <footer>
            <BlogSocial {...this.props}/>
            <p className='copyright'>
              &copy; Все права сохранены.
            </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}