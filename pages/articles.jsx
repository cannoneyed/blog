import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import duration from 'moment-duration-format'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import include from 'underscore.string/include'
import { config } from 'config'

import BlogPost from '../components/BlogPost'
import SidebarLeft from '../components/SidebarLeft'

class BlogArticles extends React.Component {
    render() {

        const pageLinks = []
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()

        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && !include(page.data.layout, 'page')) {

                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const lang = access(page, 'data.lang') || 'en'
                const datePublished = access(page, 'data.datePublished')
                const category = access(page, 'data.category')

                const readSeconds = (access(page, 'data.body').split(' ').length / 110) * 60
                const readTime = ' ' + moment.duration(readSeconds, 'seconds').format('m [min.] s[s.]')

                pageLinks.push(
                    <div className='blog-post'>
                      <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                        { moment(datePublished).format('MMMM YYYY') }
                      </time>
                      <span style={ {    padding: '5px',    fontSize: '14px'} }></span>
                      <span className='blog-category'>{ category }</span>
                      <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link style={ {    borderBottom: 'none'} } className='readmore' to={ prefixLink(page.path) }> Read
                      { readTime }
                      </Link>
                    </div>
                )
            }
        })

        const jsonLD = `
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "CollectionPage",
          "headline": "Articles - ${config.blogTitle}",
          "description": "${config.blogDescr}",
          "author": {
                    "@type": "Person",
                    "name": "${config.blogAuthor}",
                    "url": "${config.blogUrl}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "${config.blogTitle}",
              "logo": {
                "@type": "ImageObject",
                "url": "${config.blogLogoUrl}",
                "width": 600,
                "height": 60
              }
            }
        }
      </script>
    `

        return (
            <DocumentTitle title={ "Articles - " + config.blogTitle }>
              <div>
                <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
                <SidebarLeft {...this.props}/>
                <div className='content'>
                  <div className='main'>
                    <div className='main-inner'>
                      { pageLinks }
                    </div>
                    <div className='coming-soon'>
                      Coming Soon ...
                    </div>
                  </div>
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

export default BlogArticles