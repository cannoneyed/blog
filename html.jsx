import React from 'react';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers';

export default class Html extends React.Component {
  render() {
    let title;
    title = DocumentTitle.rewind();
    if (this.props.title) {
      title = this.props.title;
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <title>{this.props.title}</title>
          <link rel="shortcut icon" href={this.props.favicon}/>
          <style dangerouslySetInnerHTML={{__html:
            `
              body {
                color: #2d3641;
                font-family: 'Merriweather', Serif;
              }
              h1,h2,h3,h4,h5,h6 {
                font-family: 'Roboto', sans-serif;
                color: #2d3641;
              }
              a {
                color: #2ba1d4;
                border-bottom: 1px solid;
                text-decoration: none;
              }
              a:hover {
                border-bottom: none;
                text-decoration: none;
              }
              h2 a {
                color: #2d3641;
              }
              hr {
                border: none;
                height: 1px;
                background: #eee;
              }
            `
          }}/>
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,500,700|Merriweather:300,300italic,400,400italic,700,700italic&subset=latin,cyrillic' rel='stylesheet' type='text/css' />
          <script src={link("/bundle.js")}/>
        </body>
      </html>
    );
  }
}
Html.defaultProps = { body: "" };