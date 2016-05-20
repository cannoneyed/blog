import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import SidebarLeft from '../components/SidebarLeft'
import GithubFeed from '../components/GithubFeed'
import PocketFeed from '../components/PocketFeed'

class BlogIndex extends React.Component {
    componentDidMount() {
        const Fetch = require('../utils/Fetch')
        const pfContainer = (
        <div>
          <Fetch url='//api.ashk.io/feed/bookmarks'>
            <PocketFeed />
          </Fetch>
        </div>
        )
        const gfContainer = (
        <div>
          <Fetch url='//api.ashk.io/feed/repos'>
            <GithubFeed />
          </Fetch>
        </div>
        )

        ReactDOM.render(pfContainer, ReactDOM.findDOMNode(this.refs.pocket))
        ReactDOM.render(gfContainer, ReactDOM.findDOMNode(this.refs.github))
    }
    render() {
        const jsonLD = `
        <script type="application/ld+json">
          {
            "@context": "http://schema.org/",
            "@type": "Person",
            "name": "` + config.authorName + `",
            "jobTitle": "Full Stack Web Developer",
            "url": "http://ashk.io"
          }
        </script>
        `

        return (
            <DocumentTitle title={ config.blogTitle }>
              <div>
                <div dangerouslySetInnerHTML={ {    __html: jsonLD} } />
                <SidebarLeft {...this.props}/>
                <div className='content'>
                  <div className='main'>
                    <div className='main-inner'>
                      <div ref='pocket' />
                      <div ref='github' />
                    </div>
                  </div>
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

BlogIndex.propTypes = {
    route: React.PropTypes.object,
}

export default BlogIndex