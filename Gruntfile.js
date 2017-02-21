/**
 * Created by reinv on 20-2-2017.
 */

'use strict';

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-serve');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Serves the whole shabam on http://localhost:port for local testing
    serve: {
      options: {
        port: 9000
      }
    },

    webpack: {
      transpile: {
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
      },
      transtpileTest: {
        entry: [
          'babel-polyfill',
          './rdnaptrans.js',
          './test/server/indexTest.js',
          './test/server/lib/GrdFileTest.js'
        ],
        output: {
          path: './test/browser/',
          filename: 'bundle.js'
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
      }
    },

  });
};
