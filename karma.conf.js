/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    proxies: {
      '/test/resources/': '/base/test/browser/resources/',
      '/src/lib/resources': '/base/test/browser/resources/'
    },
    files: [
      'test/browser/*.js',
      {
        pattern: 'test/browser/resources/nogrid.txt',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      {
        pattern: 'test/browser/resources/rdnaptrans/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ]
  });
};
