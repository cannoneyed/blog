import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import ReadNext from '../ReadNext'
import { config } from 'config'

import './style.css'
import '../../static/css/highlight.css'

class BlogPost extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        const home = (
        <div>
          <Link className='gohome' to={ prefixLink('/articles/') }> All Articles
          </Link>
        </div>
        )

        const articleUrl = config.blogUrl.slice(0, -1) + access(post, "path")
        const articleThumbnail = articleUrl + access(post, "articleThumbnail")

        const jsonLD = `
            <script type="application/ld+json">
                {
                        "@context": "http://schema.org",
                        "@type": "Article",
                        "headline": "${post.title} - ${config.blogTitle}",
                        "description": "${post.description}",
                        "dateCreated": "${post.datePublished}",
                        "datePublished": "${post.datePublished}",
                        "dateModified": "${post.dateModified}",
                        "url": "${articleUrl}",
                        "mainEntityOfPage": "${articleUrl}",
                        "articleSection": "${post.articleSection}",
                        "keywords": "${post.articleKeywords}",
                        "inLanguage": "${post.articleLang}",
                        "author": {
                                "@type": "Person",
                                "name": "${config.blogAuthor}",
                                "url": "${config.blogUrl}"
                        },
                        "editor": {
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
                        },
                        "image": {
                          "@type": "ImageObject",
                          "url": "${articleThumbnail}",
                          "width": 720,
                          "height": 360
                        }
                }
            </script>
        `
        return (
            <div>
              <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
              { home }
              <div className='blog-single'>
                <div className='text'>
                  <h1>{ post.title }</h1>
                  <div ref='postBody' dangerouslySetInnerHTML={ {    __html: post.body} } />
                  <em>Published by { config.blogAuthor } at { moment(post.datePublished).format('D MMM YYYY') }</em>
                </div>
                <div className='footer'>
                  <ReadNext post={ post } {...this.props}/>
                  <p>
                    <strong>{ config.blogTitle }</strong> © All rights reserved
                  </p>
                </div>
              </div>
            </div>
            );
    }
}

BlogPost.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default BlogPost