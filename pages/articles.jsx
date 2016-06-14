import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import duration from 'moment-duration-format'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import include from 'underscore.string/include'
import { config } from 'config'

import BlogPost from '../components/BlogPost'
import BlogFooter from '../components/BlogFooter'
import BlogSidebar from '../components/BlogSidebar'

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
                    <div className='posts__elem'>
                      <time className='posts__date' dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                        { moment(datePublished).format('MMMM YYYY') }
                      </time>
                      <span style={ {    padding: '5px',    fontSize: '14px'} }></span>
                      <span className='posts__category'>{ category }</span>
                      <h2 className='posts__heading'><Link className='posts__heading-link' to={ prefixLink(page.path) } > { title } </Link></h2>
                      <p className='posts__descr' dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link className='posts__readmore' to={ prefixLink(page.path) }> Read
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
              <div>
                <Helmet
                  htmlAttributes={{"lang": "en"}}
                    title={ "Articles - " + config.blogTitle }
                    meta={[
                        {"name": "description", "content": config.blogDescr},
                    ]}
                    link={[
                         {"rel": "canonical", "href": config.blogUrl + "articles/"}
                    ]}
                />
                <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
                <div className='grid'>
                  <BlogSidebar {...this.props}/>
                  <div className='content'>
                    <div className='content__inner'>
                      <div className='posts'>
                        { pageLinks }
                      </div>
                      <div className='content__coming-soon'>
                        Coming Soon ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        )
    }
}

export default BlogArticles