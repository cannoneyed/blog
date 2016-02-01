import React from 'react';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers';
import ReadNext from '../components/ReadNext';

module.exports = React.createClass({
  render: function() {
    let post;
    post = this.props.page.data;

    return (
      <DocumentTitle title={`${post.title} | ${this.props.config.blogTitle}`}>
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              <div className='blog-post'>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.body}}/>
                <em>
                  Опубликовано {moment(post.date).lang('ru').format('D MMM YYYY')}
                </em>
              </div>
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
});
