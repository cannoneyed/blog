var rucksack = require('rucksack-css')
var lost = require("lost")
var webpack = require('webpack')
var path = require("path")

module.exports = function(config, env) {
    var is_static = env === 'static';
    var is_develop = env === 'develop';
    var is_production = env === 'production';
    var entry = config._config.entry.slice();
    var publicPath = config._config.output.publicPath;

    config._config.entry = {
      bundle: entry,
    };

    config.merge({
      postcss: [
        lost(),
        rucksack({
          autoprefixer: true
        })
      ]
    });

    //config.plugin('dedupe', webpack.optimize.DedupePlugin, []);
    //config.plugin('uglify', webpack.optimize.UglifyJsPlugin, []);

    config.removeLoader('js');
    config.removeLoader('css');

    config.loader('postcss', function(cfg) {
      cfg.test = /\.css$/;
      cfg.loaders = [
          'style-loader',
          'css',
          'postcss-loader'
      ];
      return cfg
    });

    config.loader('fonts', function(cfg) {
      cfg.test = /\.((woff|woff2|eot|ttf|svg)(\?[0-9]{8}))$/;
      cfg.loader = 'file-loader';
      return cfg
    });

    config.loader('js', function(cfg) {
      cfg.test = /\.jsx?$/;
      cfg.loaders = [
          //'react-hot',
          'babel-loader'
      ];
      return cfg
    });
  
  return config
};