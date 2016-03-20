import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import './style.css';

class GithubFeed extends React.Component {
    render() {
        // let i, repos, rep, githubFeed;

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
              <h3>Github Projects Feed</h3>
              <ul>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/hb-gatsby/gatsby-lumen-starter">gatsby-lumen-starter</a><span>—</span><span>Simple starter for Gatsby</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/mysites-blog">mysites-blog</a><span>—</span><span>Build with Gatsby (React, Webpack, PostCSS)</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/nginx-varnish-wordpress">nginx-varnish-wordpress</a><span>—</span><span>Nginx Tuning For Best Performance</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/wptemplate-hbstarter">wptemplate-hbstarter</a><span>—</span><span>Starter theme for WordPress with Gulp, Sass, and Bower</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/telescope-thumbnailurl">telescope-thumbnailurl</a><span>—</span><span>Telescope Thumbnail Url package</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/telescope-looknows">telescope-looknows</a><span>—</span><span>Telescope Looknows Theme Package</span><span>.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <a target="_blank" href="https://github.com/wpioneer/wpplugin-slidingtags">wpplugin-slidingtags</a><span>—</span><span>Sliding Tags widget for WordPress</span><span>.</span>
                  </p>
                </li>
              </ul>
            </div>
            );
    }
}

export default GithubFeed