import React from 'react'
import { config } from 'config'

import './style.css'
import '../../static/fonts/hyperico/style.css'

class BlogLinks extends React.Component {
    render() {
        return (
            <div className='social-links'>
              <ul className='social-links__list'>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogTwitterUrl }><i className='social-links__icon icon-twitter'></i></a>
                </li>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogGithubUrl }><i className='social-links__icon icon-github'></i></a>
                </li>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogVkUrl }><i className='social-links__icon icon-vkontakte'></i></a>
                </li>
              </ul>
              <ul className='social-links__list'>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogEmailUrl } rel='nofollow'><i className='social-links__icon icon-mail'></i></a>
                </li>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogTelegramUrl } rel='nofollow'><i className='social-links__icon icon-paper-plane'></i></a>
                </li>
              </ul>
              <ul className='social-links__list'>
                <li className='social-links__elem'>
                  <a className='social-links__elem-link' href={ config.blogEmailUrl }><i className='social-links__icon icon-rss'></i></a>
                </li>
              </ul>
            </div>
            );
    }
}

export default BlogLinks