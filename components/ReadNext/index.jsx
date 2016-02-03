import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';
import find from 'lodash/collection/find';
import { link } from 'gatsby-helpers';
import style from './style.css';

export default class extends React.Component {
  render() {
    let body, html, nextPost, readNext;
    readNext = this.props.post.readNext;
    if (readNext != null) {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, readNext.slice(1, -1));
      });
    }
    if (!nextPost) {
      return React.createElement("noscript", null);
    } else {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, readNext.slice(1, -1));
      });
      // Create pruned version of the body.
      html = nextPost.data.body;
      body = prune(html.replace(/<[^>]*>/g, ''), 200);

      return (
        <div>
          <h6
            style={{
              fontSize: '16px',
              margin: '20px 0 0'
            }}
          >
            По теме:
          </h6>
          <h3
            style={{
              margin: '5px 0 0'
            }}
          >
            <Link
              to={nextPost.path}
              query={{readNext: true}}
            >
              {nextPost.data.title}
            </Link>
          </h3>
          <p className='description'>{nextPost.data.description}</p>
        </div>
      );
    }
  }
}
