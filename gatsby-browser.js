import React from 'react'
import ga from 'react-google-analytics'

// Send pageview event to Google Analytics on page change.
exports.onRouteChange = (state, page, pages) => {
    ga('send', 'pageview', {
        page: state.path,
    })
}