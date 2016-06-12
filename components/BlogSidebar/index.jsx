import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import BlogNav from '../BlogNav'
import BlogLinks from '../BlogLinks'
import './style.css'

class BlogSidebar extends React.Component {
    render() {
        const {location, children} = this.props
        const isHome = location.pathname === prefixLink('/')
        const isArticles = location.pathname === prefixLink('/articles/')

        let header = (
        <header>
          { isHome || isArticles ? (
            <h1 className='sidebar__author'><Link className='sidebar__author-link' to={ prefixLink('/') }> { config.blogAuthor } </Link></h1>
            ) :
            <h2 className='sidebar__author'><Link className='sidebar__author-link' to={ prefixLink('/') }> { config.blogAuthor } </Link></h2> }
          <p className='sidebar__descr'>
            { config.blogDescr }
          </p>
        </header>
        )

        return (
            <div className='sidebar'>
              <div className='sidebar__inner'>
                <header className='sidebar__header'>
                  { header }
                  <BlogNav {...this.props} />
                </header>
                <footer className='sidebar__footer'>
                  <BlogLinks {...this.props}/>
                  <p className='sidebar__copyright'>
                    All content licensed under <a className='sidebar__copyright-link'
                                                 href='http://creativecommons.org/licenses/by-nc/4.0/'
                                                 title='CC BY-NC 4.0'
                                                 target='_blank'
                                                 rel='nofollow'>CC BY-NC 4.0</a>
                  </p>
                </footer>
              </div>
            </div>
            );
    }
}

BlogSidebar.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
}

export default BlogSidebar