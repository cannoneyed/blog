import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import BlogSidebar from '../components/BlogSidebar'
import BlogFooter from '../components/BlogFooter'
import GithubFeed from '../components/GithubFeed'
import PocketFeed from '../components/PocketFeed'

class BlogIndex extends React.Component {
    componentDidMount() {
        const Fetch = require('../utils/Fetch')

        const gfContainer = (
        <div>
          <Fetch url='//api.ashk.io/feed/repos'>
            <GithubFeed />
          </Fetch>
        </div>
        )
        ReactDOM.render(gfContainer, ReactDOM.findDOMNode(this.refs.github))

        const pfContainer = (
        <div>
          <Fetch url='//api.ashk.io/feed/bookmarks'>
            <PocketFeed />
          </Fetch>
        </div>
        )
        ReactDOM.render(pfContainer, ReactDOM.findDOMNode(this.refs.pocket))
    }
    render() {
        const jsonLD = `
        <script type="application/ld+json">
          {
            "@context": "http://schema.org/",
            "@type": "WebPage",
            "headline": "Home - ${config.blogTitle}",
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
                    title={ "Home - " + config.blogTitle }
                    meta={[
                        {"name": "description", "content": config.blogDescr},
                    ]}
                    link={[
                         {"rel": "canonical", "href": config.blogUrl}
                    ]}
                />
                <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
                <div className='grid'>
                  <BlogSidebar {...this.props} />
                  <div className='content'>
                    <div className='content__inner'>
                      <div ref='github' />
                      <div ref='pocket' />
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

BlogIndex.propTypes = {
    route: React.PropTypes.object,
}

export default BlogIndex