var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require("path")

module.exports = function(config, env) {
/*
    var entry = config._config.entry.slice();
    var publicPath = config._config.output.publicPath;

    config._config.entry = {
      bundle: entry
    }
*/
    config.merge({
/*      output: {
        publicPath: '/',
        filename: '[name].js',
      },*/
      postcss: [
        rucksack({
          autoprefixer: true
        })
      ]
    });

    //config.plugin('dedupe', webpack.optimize.DedupePlugin, []);
    //config.plugin('uglify', webpack.optimize.UglifyJsPlugin, []);

    config.removeLoader('css');
    config.loader('css', function(cfg) {
      cfg.test = /\.css$/;
      cfg.loaders = [
          //'style',
          'css'
      ];
      return cfg
    }),
    config.removeLoader('js');
    config.loader('js', function(cfg) {
      cfg.test = /\.jsx?$/;
      cfg.loaders = [
          //'react-hot',
          'babel-loader'
      ];
      return cfg
    })
  
  return config
};