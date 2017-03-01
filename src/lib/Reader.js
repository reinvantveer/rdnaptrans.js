/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

const fs = require('fs');

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
      this.read = function readFile(filePath) {
        let buffer;
        try {
          buffer = fs.readFileSync(filePath);
          return buffer;
        } catch (err) {
          throw err;
        }
      };
    } else {
      throw new Error('Browser implementation is not supported');
    }
  }

  static readShort(buffer, offset) {
    return buffer.readUInt16LE(offset);
  }

  static readDouble(buffer, offset) {
    return buffer.readDoubleLE(offset);
  }
}

module.exports = Reader;
