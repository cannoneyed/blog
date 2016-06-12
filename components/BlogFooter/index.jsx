import React from 'react'
import { config } from 'config'

import './style.css'

class BlogFooter extends React.Component {
    render() {
        return (
            <div>
              <footer className='footer'>
                <ul className='footer__nav'>
                  <li className='footer__nav-elem footer__nav-elem--back-to-top'>
                    <a className='footer__nav-elem-link'
                      href='#'
                      title='back to top'
                      rel='nofollow'>Back to top ^</a>
                  </li>
                </ul>
              </footer>
            </div>
            );
    }
}

export default BlogFooter