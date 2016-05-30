import React from 'react'
import DocumentTitle from 'react-document-title'
import SidebarLeft from '../SidebarLeft'
import access from 'safe-access'
import { config } from 'config'

import './style.css';

class BlogPage extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data

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
              <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
              <SidebarLeft {...this.props}/>
              <div className='content'>
                <div className='main'>
                  <div className='main-inner'>
                    <div className='blog-page'>
                      <div className='text'>
                        <h1>{ post.title }</h1>
                        <div dangerouslySetInnerHTML={ {    __html: post.body} } />
                      </div>
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