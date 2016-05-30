import React from 'react'
import { config } from 'config'

import './style.css'
import '../../static/fonts/hyperico/style.css'

class BlogSocial extends React.Component {
    render() {

        const twitter = config.blogTwitterUrl
        const vk = config.blogVkUrl
        const rss = config.blogRssUrl
        const email = config.blogEmailUrl
        const github = config.blogGithubUrl
        const telegram = config.blogTelegramUrl

        return (
            <div className='blog-social'>
              <ul>
                <li>
                  <a href={ twitter }><i className='icon-twitter'></i></a>
                </li>
                <li>
                  <a href={ github }><i className='icon-github'></i></a>
                </li>
                <li>
                  <a href={ vk }><i className='icon-vkontakte'></i></a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href={ email }><i className='icon-mail'></i></a>
                </li>
                <li>
                  <a href={ telegram }><i className='icon-paper-plane'></i></a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href={ rss }><i className='icon-rss'></i></a>
                </li>
              </ul>
            </div>
            );
    }
}

export default BlogSocial