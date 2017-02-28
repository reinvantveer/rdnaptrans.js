/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

const binary = require('bops');

class Reader {
  /**
   * Constructor
   * The read() function on the reader class is instantiated as a polymorphic Promise,
   * able to read either from a local file system (Node.js)
   * or from a location served over http (browser). This
   * allows the rdnaptrans module to be used in either environment,
   * as it requires the grid files under ./resources to be
   * available.
   * @param src a file or url path string
   */
  constructor() {
    const node = typeof window !== 'object';

    if (node) { // The browser has a window object, but Node.js does not
      /* eslint global-require: 0 */
      const fs = require('fs');
      this.read = function (filePath) {
        let buffer;
        try {
          buffer = fs.readFileSync(filePath);
          console.log(`reading ${filePath}`);
          return binary.from(buffer);
        } catch (err) {
          throw err;
        }
      };
    } else {
      throw new Error('Browser implementation is not supported');
    }
  }

  static readShort(buffer, offset) {
    return binary.readUInt16LE(buffer, offset);
  }

  static readDouble(buffer, offset) {
    return binary.readDoubleLE(buffer, offset);
  }
}

module.exports = Reader;
