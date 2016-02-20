var rucksack = require('rucksack-css')
var lost = require("lost")
var webpack = require('webpack')
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

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
      ],
      node: {
        fs: "empty"
      }
    });

    config.plugin('extract-css', ExtractTextPlugin, ["app.css"]);

    config.removeLoader('css');

    if(is_develop) {
      config.loader('postcss', function(cfg) {
        cfg.test = /\.css$/;
        cfg.loaders = [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ];
        return cfg
      });
    } else {
      config.loader('postcss', function(cfg) {
        cfg.test = /\.css$/;
        cfg.loader = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', { allChunks: true });
        return cfg
      });
    }

    config.loader('fonts', function(cfg) {
      cfg.test = /\.(((woff|woff2|eot|ttf|svg)(\?[0-9]{8}))|(woff|woff2|eot|ttf|svg))$/;
      cfg.loader = 'file-loader';
      return cfg
    });
  
  return config
};