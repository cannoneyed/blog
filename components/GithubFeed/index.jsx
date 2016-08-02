import React from 'react'
import './style.css'

class GithubFeed extends React.Component {
    render() {
        const repos = this.props
        const githubFeed = []

        for (var i in repos) {
            if (repos[i].fork != true) {
                githubFeed.push(
                    <li className='github-feed__elem'>
                      <a lassName='github-feed__titile-link' href={ repos[i].html_url } target='_blank'>
                        { repos[i].name }
                      </a>
                      <span className='github-feed__descr'>&nbsp;—&nbsp; { repos[i].description }.</span>
                    </li>
                )
            }
        }

        return (
            <div className='github-feed'>
              <h3 className='github-feed__heading'>Latest Projects from Github</h3>
              <ul className='github-feed__list'>
                { githubFeed }
              </ul>
            </div>
            );
    }
}

export default GithubFeed