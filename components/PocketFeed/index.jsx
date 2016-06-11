import React from 'react';
import { config } from 'config'
import './style.css';

class PocketFeed extends React.Component {
    render() {
        const bookmarks = this.props
        const pocketFeed = []

        for (var i in bookmarks) {
            if (i == 6) break
            if (bookmarks[i].Thumbnail.length != 0) {
                pocketFeed.push(
                    <div className='pocket-feed__cell'>
                      <a className='pocket-feed__thumbnail'
                        target='_blank'
                        href={ bookmarks[i].given_url }
                        rel='nofollow'><img alt={ bookmarks[i].resolved_title } height="150" src={ config.blogUploadsUrl + bookmarks[i].Thumbnail } /></a>
                      <h5 className='pocket-feed__title'><a className='pocket-feed__title-link'
                                                           target='_blank'
                                                           href={ bookmarks[i].given_url }
                                                           rel='nofollow'>{ bookmarks[i].resolved_title }</a></h5>
                    </div>
                )
            } else {
                pocketFeed.push(
                    <div className='pocket-feed__cell'>
                      <h5 className='pocket-feed__title'><a className='pocket-feed__title-link'
                                                           target="_blank"
                                                           href={ bookmarks[i].given_url }
                                                           rel='nofollow'>{ bookmarks[i].resolved_title }</a></h5>
                    </div>
                )
            }
        }

        return (
            <div className='pocket-feed'>
              <h3 className='pocket-feed__heading'>Daily Digest</h3>
              <div className='pocket-feed__row'>
                { pocketFeed }
              </div>
            </div>
            );
    }
}

export default PocketFeed