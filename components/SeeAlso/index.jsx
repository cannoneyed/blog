import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';

import style from './style.css';

export default class extends React.Component {
  render() {
    return (
      <div className='see-also'>
        <section className="see-also-section twitter-section">
          <h1 className="see-also-header">Twitter</h1>
          <div id="js-recent-tweets">
            <article className="tweet">
              <p>@contraceptual There is no built in feature like this. and we don’t plan to add it. You’ll need a web-developer for that customization.</p>
            </article>
            <article className="tweet">
              <p>@msojda you will break the license.</p>
            </article>
            <article className="tweet">
              <p>@mathieudemuizon use this code:</p>
            </article>
          </div>
        </section>
      </div>
    );
  }
}