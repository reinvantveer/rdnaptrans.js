/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const chai = require('chai');

chai.should();

const Reader = require('../../../src/lib/Reader');

describe('reader', () => {
  it('reads a the first characters of a grid file', () => {
    const gridBuffer = Reader.read('x2c.grd');
    gridBuffer.should.not.equal(null);
    Buffer.isBuffer(gridBuffer).should.equal(true);
    return gridBuffer.slice(0, 4).toString().should.equal('DSBB');
  });

  it('allows reading a file as a buffer', () => {
    const gridBuffer = Reader.read('x2c.grd');
    Buffer.isBuffer(gridBuffer).should.equal(true);
    const cols = gridBuffer.readUInt16LE(4);
    cols.should.equal(310);
    const rows = gridBuffer.readUInt16LE(6);
    return rows.should.equal(343);
  });
});
