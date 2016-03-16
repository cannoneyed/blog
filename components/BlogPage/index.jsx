import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { link } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import SidebarLeft from '../SidebarLeft'
import ContactForm from '../ContactForm'
import access from 'safe-access'
import { config } from 'config'

import './style.css';

class BlogPage extends React.Component {
  render() {
    const { route } = this.props
    const post = route.page.data

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
            "@type": "WebPage",
            "author": {
                "@type": "Person",
                "name": "` + config.authorName + `",
                "url": "http://ashk.io/",
                "sameAs": "http://ashk.io/"
            },
            "mainEntity":{
	            "@type": "` + post.pageType + `",
	            "headline": "` + post.title + `",
	            "inLanguage": "` + inLanguage + `",
	            "description": "` + description + `"
	        }
        }
      </script>
    `

    return (
        <div>
          <div dangerouslySetInnerHTML={{__html: jsonLD}}/>
          <SidebarLeft {...this.props}/>
          <div className='content'>
            <div className='main'>
             <div className='main-inner'>
                <div className='blog-page'>
                  <div className='text'>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.body}}/>
                    {post.pageType == 'ContactPage'?<ContactForm />:null}
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