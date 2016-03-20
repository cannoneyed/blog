import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { link } from 'gatsby-helpers'
import BlogNav from '../BlogNav'
import BlogSocial from '../BlogSocial'
import { config } from 'config'
import './style.css'

class SidebarLeft extends React.Component {
    render() {
        const {location, children} = this.props
        const isHome = location.pathname === link('/')

        let header = (
        <header>
          <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    outline: 'none'} } to={ link('/') }>
          <img src='./images/photo.png'
            srcSet="./images/photo@2x.png 2x"
            width='100'
            height='100'
            style={ {    marginBottom: '15px',    borderRadius: '5%',    backgroundClip: 'padding-box'} } />
          </Link>
          { isHome ? (
            <h1><Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ link('/') }> { config.blogTitle } </Link></h1>
            ) :
            <h2><Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ link('/') }> { config.blogTitle } </Link></h2> }
          <p>
            { config.blogDescr }
          </p>
        </header>
        )

        return (
            <div className='sidebar'>
              <div className='sidebar-inner'>
                <div className='blog-details'>
                  <header>
                    { header }
                  </header>
                </div>
                <div className='blog-options'>
                  <BlogNav {...this.props}/>
                  <footer>
                    <BlogSocial {...this.props}/>
                    <p className='copyright'>
                      &copy; All rights reserved.
                    </p>
                  </footer>
                </div>
              </div>
            </div>
            );
    }
}

SidebarLeft.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
}

export default SidebarLeft