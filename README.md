# rdnaptrans.js
[![Build Status](https://travis-ci.org/reinvantveer/rdnaptrans.js.svg?branch=master)](https://travis-ci.org/reinvantveer/rdnaptrans.js)

JavaScript implementation of RDNAPTRANS&trade;
https://www.kadaster.nl/web/Themas/Registraties/Rijksdriehoeksmeting/Transformatie-van-coordinaten.htm

For Node.js back end and (future!) browser front end. The JS implementation deviates in the respect of its asynchronous nature. This is due to the loading of the grid files needed for the final correction of the coordinates.


# Install:
## Node.js v6+
* clone the repo
* run `npm install`

## Node.js pre-v6
You can use the precompiled ES5 version in `./dist`. Or you can compile with `npm run build`.

## Browser
Browser implementation is not supported at the moment.

# Usage:
The `phi`, `lambda` and `h` stuff in the returned Geographic object correspond with latitude, longitude and height. Due to the port, the implementation is still very close to the original Java version. Therefore, you need a few helping classes to convert from RD or ETRS89.

## Node.js
```js
const Transform = require('rdnaptrans').Transform;
const Geographic = require('rdnaptrans').Geographic;
const Cartesian = require('rdnaptrans').Cartesian;

const texelRD = new Cartesian(117380.1200, 575040.3400, 1.0000);
const texelETRS = Transform.rdnap2etrs(texelRD);
console.log(texelETRS);
/* output:
Geographic {
  phi: 53.16075304177141,
  lambda: 4.824761912426986,
  h: 42.86140355819888 }
 */
```

# Testing
The module is built and tested for Node on Travis. However, you can run the tests yourself simply by using `grunt webpack` and `npm test`. grunt is installed through `npm install -g grunt grunt-cli`.

# Future
TODO:
- [ ] Create browser compatible version
- [ ] Re-enable browser tests
- [ ] Create geoJSON convenience functions
- [ ] Create toFixed() convenience functions
- [ ] Create convenience properties or functions for lat, lon, z on Geographic class
- [ ] Expand examples