# rdnaptrans.js
[![Build Status](https://travis-ci.org/reinvantveer/rdnaptrans.js.svg?branch=master)](https://travis-ci.org/reinvantveer/rdnaptrans.js)

JavaScript implementation of RDNAPTRANS&trade;
https://www.kadaster.nl/web/Themas/Registraties/Rijksdriehoeksmeting/Transformatie-van-coordinaten.htm

Compatible with Node.js back end and browser front end. The JS implementation deviates in the respect of its asynchronous nature. This is due to the loading of the grid files needed for the final correction of the coordinates.


# Install:
## Node.js v6+
* clone the repo
* run `npm install`

## Node.js pre-v6
You can use the precompiled ES5 version in `./dist`. Or you can compile with `npm run build`.

## Browser
### As is
As under the Node.js install section, install with `npm install`. For your convenience, there is a pre-compiled version of rdnaptrans.js in `./dist`. Copy the files to your browser project, they have been transpiled to ES5. Or you can build it yourself with `npm run build`.

### With some kind of bundler/packer/whatever
You can require the rdnaptrans.js in the root of the project, it is in ES6.

# Usage:
The `phi`, `lambda` and `h` stuff in the returned Geographic object correspond with latitude, longitude and height. Due to the port, the implementation is still very close to the original Java version. Therefore, you need a few helping classes to convert from RD or ETRS89.

## Node.js
```js
const Transform = require('rdnaptrans').Transform;
const Geographic = require('rdnaptrans').Geographic;
const Cartesian = require('rdnaptrans').Cartesian;

const texelRD = new Cartesian(117380.1200, 575040.3400, 1.0000);
Transform.rdnap2etrs(texelRD)
  .then(texelETRS => console.log(texelETRS));
/* output:
Geographic {
  phi: 53.16075304177141,
  lambda: 4.824761912426986,
  h: 42.86140355819888 }
 */
```

## Browser
Loading the `rdnaptrans.js` file will expose a global `rdnaptrans` variable to your window object. So, you can access it directly:
```js
var texelRD = new rdnaptrans.Cartesian(117380.1200, 575040.3400, 1.0000);
rdnaptrans.Transform.rdnap2etrs(texelRD)
  .then(texelETRS => console.log(texelETRS));
/* output:
Geographic {
  phi: 53.16075304177141,
  lambda: 4.824761912426986,
  h: 42.86140355819888 }
 */
```

# Testing
The module is built and tested for Node and browser on Travis. However, you can run the tests yourself simply by using `grunt webpack` and `npm test`. grunt is installed through `npm install -g grunt grunt-cli`.

# Future
TODO:
- [ ] Fix grid file reloading bug
- [ ] Create geoJSON convenience functions
- [ ] Create toFixed() convenience functions
- [ ] Create convenience properties or functions for lat, lon, z on Geographic class
- [ ] Expand example