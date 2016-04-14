var rucksack = require('rucksack-css')
var lost = require("lost")
var webpack = require('webpack')
var path = require("path")

exports.modifyWebpackConfig = function(config, env) {
    var is_static = env === 'static'
    var is_develop = env === 'develop'
    var is_production = env === 'production'

    config.merge({
        postcss: [
            lost(),
            rucksack({
                autoprefixer: true
            })
        ]
    });

    config.loader('fonts', function(cfg) {
        cfg.test = /\.(((woff|woff2|eot|ttf|svg)(\?[0-9]{8}))|(woff|woff2|eot|ttf|svg))$/
        cfg.loader = 'file-loader'
        return cfg
    });

    return config
};