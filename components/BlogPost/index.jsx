import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import ReadNext from '../ReadNext'
import { config } from 'config'

import './style.css'
import '../../static/css/highlight.css'

class BlogPost extends React.Component {
  render() {
    const { route } = this.props
    const post = route.page.data
    const home = (
      <div>
        <Link
          className='gohome'
          to={link('/')}
        >
          All Articles
        </Link>
      </div>
    )
    const jsonLD = `
      <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Article",
            "publisher": "` + config.authorName + `",
            "author": {
                "@type": "Person",
                "name": "` + config.authorName + `",
                "url": "http://ashel.xyz/",
                "sameAs": "http://ashel.xyz/"
            },
            "headline": "` + post.title + `",
            "url": "",
            "datePublished": "` + post.datePublished + `",
            "dateModified": "` + post.dateModified + `",
            "description": "` + post.description + `";
        }
      </script>
    `

    return (
        <div>
          <div dangerouslySetInnerHTML={{__html: jsonLD}}/>
          {home}
          <div className='blog-single'>
            <div className='text'>
              <h1>{post.title}</h1>
                <div ref='postBody' dangerouslySetInnerHTML={{__html: post.body}}/>
              <em>
                Published {moment(post.datePublished).format('D MMM YYYY')}
              </em>
            </div>
            <div className='footer'>
              <ReadNext post={post} {...this.props}/>
              <p>
                <strong>{config.authorName}</strong> © All rights reserved. <a href={config.twitter}>wpioneer on Twitter</a>
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