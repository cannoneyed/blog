import React from 'react'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'

export default class Html extends React.Component {
  render() {
    const { favicon, body } = this.props
    let title = DocumentTitle.rewind()
    if (this.props.title) {
      title = this.props.title
    }

    let cssLink
    if (process.env.NODE_ENV === 'production') {
      cssLink = <link rel="stylesheet" href={link('/styles.css')} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta
            name="viewport"
            content="user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
          <title>{this.props.title}</title>
          <link rel="shortcut icon" href={favicon} />
          <style dangerouslySetInnerHTML={{__html:
            `
              body {
                color: #222;
                font-family: 'Proxima Nova', Arial, sans-serif;
              }
              h1,h2,h3,h4,h5,h6 {
                font-family: 'Proxima Nova', Arial, sans-serif;
                color: #222;
              }
              a {
                color: #1751FF;
                border-bottom: 1px solid;
                text-decoration: none;
              }
              a:hover {
                border-bottom: none;
                text-decoration: none;
              }
              h2 a {
                color: #222;
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
          {cssLink}
          <script src={link('/bundle.js')}/>
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  body: React.PropTypes.string,
  favicon: React.PropTypes.string,
  title: React.PropTypes.string,
}

Html.defaultProps = { body: '' }