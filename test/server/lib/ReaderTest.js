/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Reader = require('../../../src/lib/Reader');

const reader = new Reader();

chai.use(chaiAsPromised);
chai.should();

describe('reader', () => {
  it('reads a the first characters of a grid file', () => {
    const gridBuffer = reader.read('./src/lib/resources/rdnaptrans/x2c.grd');
    gridBuffer.should.not.equal(null);
    Buffer.isBuffer(gridBuffer).should.equal(true);
    return gridBuffer.slice(0, 4).toString().should.equal('DSBB');
  });

  it('allows reading a file as a buffer', () => {
    const gridBuffer = reader.read('./src/lib/resources/rdnaptrans/x2c.grd');
    Buffer.isBuffer(gridBuffer).should.equal(true);
    const cols = gridBuffer.readUInt16LE(4);
    cols.should.equal(310);
    const rows = gridBuffer.readUInt16LE(6);
    return rows.should.equal(343);
  });
});
