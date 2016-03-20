import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment';
import duration from 'moment-duration-format'
// import Fetch from 'react-fetch';
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'

import BlogPost from '../components/BlogPost'
import SidebarLeft from '../components/SidebarLeft'
import BlogContent from '../components/BlogContent'
import GithubFeed from '../components/GithubFeed'

/* 
  Data Fetching
  <Fetch url="https://api.github.com/users/wpioneer/repos?per_page=30&sort=created&direction=desc">
  <GithubFeed/>
  </Fetch>
*/

class BlogIndex extends React.Component {
    render() {

        const pageLinks = []
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()

        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') != 'page') {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const lang = access(page, 'data.lang') || 'en'
                const datePublished = access(page, 'data.datePublished')
                const category = access(page, 'data.category')

                let readSeconds = (access(page, 'data.body').split(' ').length / 120) * 60
                const readTime = ' ' + moment.duration(readSeconds, 'seconds').format('m [min.] s[s.]')

                pageLinks.push(
                    <div className='blog-post'>
                      <span style={ {    backgroundImage: 'url(./images/' + lang + '.png)'} } className='flag'></span>
                      <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                        { moment(datePublished).format('MMMM YYYY') }
                      </time>
                      <span style={ {    padding: '5px',    fontSize: '14px'} }></span>
                      <span className='blog-category'>{ category }</span>
                      <h2><Link style={ {    borderBottom: 'none',} } to={ link(page.path) } > { title } </Link></h2>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link style={ {    borderBottom: 'none'} } className='readmore' to={ link(page.path) }> Read
                      { readTime }
                      </Link>
                    </div>
                )
            }
        })

        const jsonLD = `
      <script type="application/ld+json">
        {
          "@context": "http://schema.org/",
          "@type": "Person",
          "name": "Alexander Shelepenok",
          "jobTitle": "Full Stack Web Developer",
          "url": "http://ashk.io"
        }
      </script>
    `

        return (
            <DocumentTitle title={ config.blogTitle }>
              <div>
                <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
                <SidebarLeft {...this.props}/>
                <div className='content'>
                  <div className='main'>
                    <div className='main-inner'>
                      { pageLinks }
                    </div>
                  </div>
                  <GithubFeed/>
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

BlogIndex.propTypes = {
    route: React.PropTypes.object,
}

export default BlogIndex