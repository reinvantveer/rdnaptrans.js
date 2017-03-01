/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

const fs = require('fs');

// There's a good reason not to include the path module in the dependencies:
// It would create another hurdle to overcome in browserifying the package.
/* eslint no-path-concat: 0 */
const gridFiles = {
  'x2c.grd': fs.readFileSync(__dirname + '/resources/rdnaptrans/x2c.grd'),
  'y2c.grd': fs.readFileSync(__dirname + '/resources/rdnaptrans/y2c.grd'),
  'nlgeo04.grd': fs.readFileSync(__dirname + '/resources/rdnaptrans/nlgeo04.grd'),
};

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
  static read(grdFile) {
    const node = typeof window !== 'object';

    if (node) { // The browser has a window object, but Node.js does not
      let buffer;
      try {
        buffer = gridFiles[grdFile];
        if (!buffer) throw new Error(`${grdFile} is not a valid grd file.`);
        return buffer;
      } catch (err) {
        throw err;
      }
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
