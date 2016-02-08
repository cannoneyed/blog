import React from 'react';
import moment from 'moment';
import Fetch from 'react-fetch'
import { RouteHandler, Link } from 'react-router';
import sortBy from 'lodash/collection/sortBy';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers';
import BlogPost from '../components/BlogPost';
import SidebarLeft from '../components/SidebarLeft';
import BlogContent from '../components/BlogContent';
import GithubFeed from '../components/GithubFeed';
import proxima from '../static/fonts/proxima/stylesheet.css';

export default class extends React.Component {
  static data() {
    return {
      yo: true
    }
  }
  render() {
    let i, len, page, pageLinks, ref, ref1, ref2, title, body;
    pageLinks = [];
    ref = sortBy(this.props.pages, (page) => {
      let ref;
      return (ref = page.data) != null ? ref.datePublished : void 0;
    }).reverse();
    for (i = 0, len = ref.length; i < len; i++) {
      page = ref[i];
      title = ((ref1 = page.data) != null ? ref1.title : void 0) || page.path;
      if (page.path && page.path !== '/' && !((ref2 = page.data) != null ? ref2.draft : void 0)) {
        pageLinks.push(
          <div className='blog-post'>
            <time dateTime={moment(ref1.datePublished).locale('ru').format('MMMM D, YYYY')}>{moment(ref1.datePublished).locale('ru').format('MMMM YYYY')}</time>
            <span
              style={{
                padding: '5px',
                fontSize: '14px'
              }}
            >
              •
            </span>
            <span className='blog-category'>{ref1.category}</span>
            <h2>
              <Link
                style={{
                  borderBottom: 'none',
                }} 
                to={link(page.path)}
              >
                {title}
              </Link>
            </h2>
            <p dangerouslySetInnerHTML={{__html: ref1.description}}/>
            <Link
              style={{
                borderBottom: 'none'
              }}
              className='readmore'
              to={link(page.path)}
            >
              Читать
            </Link>

          </div>
        );
      }
    }
    return (
      <DocumentTitle title={this.props.config.blogTitle}>
        <div>
          <SidebarLeft {...this.props}/>
          <div className='content'>
            <div className='main'>
              <div className='main-inner'>
                {pageLinks}
              </div>
            </div>
            <Fetch url="http://api.github.com/users/wpioneer/repos?per_page=30&sort=created&direction=desc">
              <GithubFeed/>
            </Fetch>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
