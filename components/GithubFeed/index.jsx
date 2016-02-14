import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';

export default class extends React.Component {
  render() {
    let i, repos, rep, githubFeed;

    repos = this.props;
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
    }

    return (
      <div className='github-feed'>
        <h3>Github Projects</h3>
        <ul>
          {githubFeed}
        </ul>
      </div>
    );
  }
}