import React from 'react'
import './style.css'

class GithubFeed extends React.Component {
    render() {
        const repos = this.props
        const githubFeed = []

        for (var i in repos) {
            if (repos[i].fork != true) {
                githubFeed.push(
                    <li>
                      <p>
                        <a href={ repos[i].html_url }>
                          { repos[i].name }
                        </a>
                        <span>&nbsp;—&nbsp; { repos[i].description }.</span>
                      </p>
                    </li>
                )
            }
        }

        return (
            <div className="github-feed">
              <h3>Github Projects Feed</h3>
              <ul>
                { githubFeed }
              </ul>
            </div>
            );
    }
}

export default GithubFeed