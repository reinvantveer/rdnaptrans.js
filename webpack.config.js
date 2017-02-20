/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = {
  entry: [
    'babel-polyfill',
    './rdnaptrans.js'
  ],
  output: {
    path: './dist/',
    filename: 'rdnaptrans.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
