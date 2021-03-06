/**
 * Created by veerr on 8-2-2017.
 */
/* eslint-env mocha */

'use strict';

const GrdFile = require('../../../src/lib/GrdFile');
const chai = require('chai');

chai.should();

describe('GrdFile', () => {
  it('verifies the grid files data presence', () => {
    const grdFileDx = GrdFile.GRID_FILE_DX();
    grdFileDx.grdInner.length.should.deep.equal(425376);
  });

  it('rejects a file that is not a valid grid file', () => {
    /* eslint no-new: 0 */
    (() => { new GrdFile('./test/resources/nogrid.txt'); })
      .should.throw(Error, 'not a valid grd file');
  });

  it('reads the x offset grid file header', () => {
    const grdFile = new GrdFile('x2c.grd');
    return grdFile.header.should.deep.equal({
      sizeX: 310,
      sizeY: 343,
      minX: -8000.0,
      maxX: 301000.0,
      minY: 288000.0,
      maxY: 630000.0,
      minValue: -0.17173554003238678,
      maxValue: 0.22832782566547394,
      stepSizeX: 1000.0,
      stepSizeY: 1000.0,
      safeMinX: -7000.0,
      safeMaxX: 300000.0,
      safeMinY: 289000.0,
      safeMaxY: 629000.0
    });
  });
});
