/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

const binary = require('bops');
const $ = require('jquery');

function setTransport() {
  $.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (
      window.FormData
      && (
        (options.dataType && (options.dataType == 'binary'))
        || (options.data
          && ((window.ArrayBuffer && options.data instanceof ArrayBuffer)
            || (window.Blob && options.data instanceof Blob)
          )
        )
      )
    ) {
      return {
        // create new XMLHttpRequest
        send: (headers, callback) => {
          // setup all variables
          const xhr = new XMLHttpRequest();
          const url = options.url;
          const type = options.type;
          const async = options.async && true;
          console.log({ async });
          // blob or arraybuffer. Default is blob
          const dataType = options.responseType || 'blob';
          const data = options.data || null;
          const username = options.username || null;
          const password = options.password || null;

          xhr.addEventListener('load', () => {
            let data = {};
            data[options.dataType] = xhr.response;
            // make callback and send data
            callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
          });

          xhr.open(type, url, async, username, password);

          // setup custom headers
          for (var i in headers ) {
            xhr.setRequestHeader(i, headers[i]);
          }

          xhr.responseType = dataType;
          xhr.send(data);
        },
        abort: () => jqXHR.abort()
      };
    }
  });
}

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
      setTransport();
      this.read = function (url) {
        let data;
        const call = $.ajax({
          url,
          type: 'GET',
          dataType: 'binary',
          responseType: 'arraybuffer',
          processData: false,
          async: false,
        });

        //console.log('state:', call.readyState);
        //console.log(call.readyState);
        //console.log(data);
        return data;
      };
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
