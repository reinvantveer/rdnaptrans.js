/**
 * Created by veerr on 20-2-2017.
 */

'use strict';

/* eslint-env mocha */
describe('Global variable', function () {
  it('verifies the working of the global rdnaptrans variable', function () {
    var transformed = rdnaptrans.Transform
      .etrs2rdnap(new rdnaptrans.Geographic(53.160753042, 4.824761912, 42.8614));
    var actualToFixed = {
      X: parseFloat(transformed.X.toFixed(4)),
      Y: parseFloat(transformed.Y.toFixed(4)),
      Z: parseFloat(transformed.Z.toFixed(4))
    };

    var rd = new rdnaptrans.Cartesian(117380.1200, 575040.3400, 1.0000);
    return actualToFixed.should.deep.equal(rd);
  });
});
