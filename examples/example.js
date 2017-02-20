/**
 * Created by veerr on 13-2-2017.
 */
const Transform = require('../../rdnaptrans').Transform;
const Geographic = require('../../rdnaptrans').Geographic;
const Cartesian = require('../../rdnaptrans').Cartesian;

const texelRD = new Cartesian(117380.1200, 575040.3400, 1.0000);
Transform.rdnap2etrs(texelRD)
  .then(texelETRS => console.log(texelETRS));
