import React from 'react';
import moment from 'moment';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import DocumentTitle from 'react-document-title';
import ReadNext from '../components/ReadNext';

export default class extends React.Component {
  render() {
    let post, home;
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

    return (
      <DocumentTitle title={`${post.title} | ${this.props.config.blogTitle}`}>
        <div>
          {home}
          <div className='blog-single'>
            <div className='text'>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{__html: post.body}}/>
              <em>
                Опубликовано {moment(post.date).lang('ru').format('D MMM YYYY')}
              </em>
            </div>
            <div className='footer'>
              <ReadNext post={post} {...this.props}/>
              <p>
                <strong>{this.props.config.authorName}</strong> &copy; Все права сохранены. <a href="https://twitter.com/wpioneer0">@wpioneer on Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
