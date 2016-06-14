import React from 'react'
import BlogSidebar from '../BlogSidebar'
import Helmet from 'react-helmet'
import access from 'safe-access'
import { config } from 'config'

import BlogFooter from '../BlogFooter'
import './style.css'

class BlogPage extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        const articleUrl = config.blogUrl.slice(0, -1) + access(post, "path")
        const description = access(post, 'description') || post.body
        const jsonLD = `
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "${post.pageType}",
          "headline": "${post.title} - ${config.blogTitle}",
          "description": "${post.description}",
          "inLanguage": "${post.articleLang}",
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
                  title={ `${post.title} - ${config.blogTitle}` }
                  meta={[
                      {"name": "description", "content": post.description}
                  ]}
                  link={[
                       {"rel": "canonical", "href": articleUrl}
                  ]}
              />
              <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
              <div className='grid'>
                <BlogSidebar {...this.props}/>
                <div className='content'>
                  <div className='content__inner'>
                    <div className='page'>
                      <h1 className='page__heading'>{ post.title }</h1>
                      <div className='page__body' dangerouslySetInnerHTML={ {    __html: post.body} } />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
    }
}

BlogPage.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default BlogPage