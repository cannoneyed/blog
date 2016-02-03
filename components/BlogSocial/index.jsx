import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';
import hyperico from '../../static/fonts/hyperico/style.css';

export default class extends React.Component {
  render() {
    let twitter, vk, rss, email, github, telegram;

    twitter = this.props.config.blogTitle;
    vk = this.props.config.vk;
    rss = this.props.config.rss;
    email = this.props.config.email;
    github = this.props.config.github;
    telegram = this.props.config.telegram;

    return (
      <div className='blog-social'>
        <ul>
          <li><a href={twitter}><i className='icon-twitter'></i></a></li>
          <li><a href={github}><i className='icon-github'></i></a></li>
          <li><a href={vk}><i className='icon-vkontakte'></i></a></li>
        </ul>
        <ul>
          <li><a href={email}><i className='icon-mail'></i></a></li>
          <li><a href={telegram}><i className='icon-paper-plane'></i></a></li>
        </ul>
        <ul>
          <li><a href={rss}><i className='icon-rss'></i></a></li>
        </ul>
      </div>
    );
  }
}