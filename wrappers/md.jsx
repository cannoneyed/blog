import React from 'react';
import moment from 'moment';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import DocumentTitle from 'react-document-title';
import ReadNext from '../components/ReadNext';

export default class extends React.Component {
  render() {
    let post, home, postUrl, jsonLD;
    post = this.props.page.data;
    home = (
      <div>
        <Link
          className='gohome'
          to={link('/')}
        >
          Все посты
        </Link>
      </div>
    );

    jsonLD = `
      <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Article",
            "publisher": "` + this.props.config.authorName + `",
            "author": {
                "@type": "Person",
                "name": "` + this.props.config.authorName + `",
                "url": "http://ashel.xyz/",
                "sameAs": "http://ashel.xyz/"
            },
            "headline": "` + post.title + `",
            "url": "",
            "datePublished": "` + post.datePublished + `",
            "dateModified": "` + post.dateModified + `",
            "description": "` + post.description + `";
        }
      </script>
    `;

    return (
      <DocumentTitle title={`${post.title} | ${this.props.config.blogTitle}`}>
        <div>
          <div dangerouslySetInnerHTML={{__html: jsonLD}}/>
          {home}
          <div className='blog-single'>
            <div className='text'>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{__html: post.body}}/>
              <em>
                Опубликовано {moment(post.datePublished).locale('ru').format('D MMM YYYY')}
              </em>
            </div>
            <div className='footer'>
              <ReadNext post={post} {...this.props}/>
              <p>
                <strong>{this.props.config.authorName}</strong> &copy; Все права сохранены. <a href={this.props.config.twitter}>@wpioneer on Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
