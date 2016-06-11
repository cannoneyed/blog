import React from 'react'
import { Link } from 'react-router'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'
import style from './style.css'

class ReadNext extends React.Component {
    render() {
        const {pages, post} = this.props
        const {readNext} = post

        let nextPost
        if (readNext) {
            nextPost = find(pages, (page) => includes(page.path, readNext)
            )
        }
        if (!nextPost) {
            return React.createElement('noscript', null)
        } else {
            nextPost = find(pages, (page) => includes(page.path, readNext.slice(1, -1))
            )
            const description = nextPost.data.description

            return (
                <div className='read - next'>
                  <h6 className='read-next__heading'>Read this next:</h6>
                  <h3 className='read-next__title'><Link to={ nextPost.path } query={ {    readNext: true} } > { nextPost.data.title } </Link></h3>
                  <p className='read-next__descr'>
                    { description }
                  </p>
                </div>
                );
        }
    }
}

ReadNext.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default ReadNext