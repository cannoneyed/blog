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
          <Link className='gohome' to={ prefixLink('/') }> All Articles
          </Link>
        </div>
        )

        const description = access(post, 'description') || post.body

        let inLanguage
        if (post.lang == 'ru') {
            inLanguage = 'Russian'
        } else {
            inLanguage = 'English'
        }

        const jsonLD = `
						<script type="application/ld+json">
								{
												"@context": "http://schema.org",
												"@type": "Article",
												"headline": "` + post.title + `",
												"datePublished": "` + post.datePublished + `",
												"dateModified": "` + post.dateModified + `",
												"description": "` + description + `",
												"publisher": "` + config.authorName + `",
												"inLanguage": "` + inLanguage + `",
												"author": {
																"@type": "Person",
																"name": "` + config.authorName + `",
																"url": "http://ashk.io/",
																"sameAs": "http://ashk.io/"
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
                  <em>Published { moment(post.datePublished).format('D MMM YYYY') }</em>
                </div>
                <div className='footer'>
                  <ReadNext post={ post } {...this.props}/>
                  <p>
                    <strong>{ config.authorName }</strong> © All rights reserved. <a href={ config.twitter }>wpioneer on Twitter</a>
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