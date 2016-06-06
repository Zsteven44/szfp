var crypto = require('crypto');
module.exports = genuuid;

/**
 * Generate a unique UUID.
 */
function genuuid() {
  return uuidFromBytes(crypto.randomBytes(16));
}

/**
 *
 * @param rnd
 * @returns {string}
 */
function uuidFromBytes(rnd) {
  rnd[6] = (rnd[6] & 0x0f) | 0x40;
  rnd[8] = (rnd[8] & 0x3f) | 0x80;
  rnd = rnd.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
  rnd.shift();
  return rnd.join('-');
}