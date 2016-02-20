import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';

export default class extends React.Component {
  render() {
    let i, repos, rep, githubFeed;

/*  repos = this.props;
    githubFeed = [];

    for(i in repos) {
      rep = repos[i];
      if (rep.fork != true) {
        githubFeed.push(
          <li>
            <p><a href={rep.html_url}>{rep.name}</a> — {rep.description}.</p>
          </li>
        )
      }
}*/

    return (
        <div className="github-feed">
          <h3>Лента Github проектов</h3>
          <ul>
            <li><p><a target="_blank" href="https://github.com/wpioneer/lsplugin-jsonld">lsplugin-jsonld</a><span> — </span><span>JSON-LD for LiveStreet</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/mysites-blog">mysites-blog</a><span> — </span><span>Build with React, ES6, Webpack and postCSS</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/lscomponent-hbvendor">lscomponent-hbvendor</a><span> — </span><span>Vendor component for LS 2.0</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/lstemplate-yeti">lstemplate-yeti</a><span> — </span><span>Starter theme for LS 2.0 with Webpack, PostCSS and Bower</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/wptemplate-hyperstarter">wptemplate-hyperstarter</a><span> — </span><span>Starter theme for WordPress with Gulp, Sass, and Bower</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/meteorjs-thumbnailurl">meteorjs-thumbnailurl</a><span> — </span><span>Telescope Thumbnail Url package</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/meteorjs-looknows">meteorjs-looknows</a><span> — </span><span>Telescope Looknows Theme Package</span><span>.</span></p></li>
            <li><p><a target="_blank" href="https://github.com/wpioneer/wpplugin-slidingtags">wpplugin-slidingtags</a><span> — </span><span>Sliding Tags widget for WordPress</span><span>.</span></p></li>
          </ul>
        </div>
    );
  }
}