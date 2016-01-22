var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require("path")

module.exports = function(config, env) {
  if(env === 'static') {
    var entry = config._config.entry.slice();
    var publicPath = config._config.output.publicPath;

    config._config.entry = {
      bundle: entry
    }

    config.merge({
      output: {
        publicPath: '/',
        filename: '[name].js',
      },
      postcss: [
        rucksack({
          autoprefixer: true
        })
      ]
    });

    //config.plugin('ignoreplugin', webpack.IgnorePlugin, ['/^\.\/locale$/', '/moment$/']);
    //config.plugin('vendor', webpack.optimize.CommonsChunkPlugin, ['vendor','vendor.bundle.js']);
    config.plugin('dedupe', webpack.optimize.DedupePlugin, []);
    config.plugin('uglify', webpack.optimize.UglifyJsPlugin, []);

    config.removeLoader('css');
    config.loader('css', function(cfg) {
      cfg.test = /\.css$/;
      cfg.loaders = [
          //'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
      ];
      return cfg
    }),
    config.removeLoader('js');
    config.loader('js', function(cfg) {
      cfg.test = /\.jsx?$/;
      cfg.loaders = [
          'react-hot',
          'babel-loader'
      ];
      return cfg
    })
  }

  return config
};