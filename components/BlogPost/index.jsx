import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import ReadNext from '../ReadNext'
import BlogFooter from '../BlogFooter'
import './style.css'
import '../../static/css/highlight.css'

class BlogPost extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        const home = (
        <div>
          <Link className='post__gohome' to={ prefixLink('/articles/') }> All Articles
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
              <Helmet
                  htmlAttributes={{"lang": "ru"}}
                  title={ `${post.title} - ${config.blogTitle}` }
                  meta={[
                      {"name": "description", "content": post.shortDescription},
                      {"property": "og:type", "content": "article"}
                  ]}
                  link={[
                       {"rel": "canonical", "href": articleUrl}
                  ]}
              />
              <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
              <div className='post'>
                { home }
                <h1 className='post__heading'>{ post.title }</h1>
                <div className='post__body' dangerouslySetInnerHTML={ {    __html: post.body} } />
                <div className='post__footer'>
                  <p className='post__meta'>
                    { "Published by " + config.blogAuthor + " at " + moment(post.datePublished).format('D MMM YYYY') }
                  </p>
                  <ReadNext post={ post } {...this.props} />
                  <p>
                    All content licensed under <a href='http://creativecommons.org/licenses/by-nc/4.0/'
                                                 title='CC BY-NC 4.0'
                                                 target='_blank'
                                                 rel='nofollow'>CC BY-NC 4.0</a>
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