import React from 'react'
import { config } from 'config'
import BlogPost from '../components/BlogPost'
import BlogPage from '../components/BlogPage'

class MarkdownWrapper extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data

        let layout, template
        layout = post.layout

        if (layout != 'page') {
            template = <BlogPost {...this.props}/>
        } else {
            template = <BlogPage {...this.props}/>
        }

        return (
              <div>
                { template }
              </div>
            );
    }
}

MarkdownWrapper.propTypes = {
    route: React.PropTypes.object,
}

export default MarkdownWrapper