import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import ga from 'react-google-analytics'

import '../static/fonts/proxima/stylesheet.css'

class Template extends React.Component {
    render() {
        const {location, children} = this.props

        var GAInitiailizer = ga.Initializer
        ga('create', 'UA-73379983-1', 'auto')
        ga('send', 'pageview')

        return (
            <div className='wrapper'>
              { children }
              <GAInitiailizer />
            </div>
            );
    }
}

Template.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template