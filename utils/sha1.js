
const crypto = require('crypto');

module.exports = (text) => crypto.createHash('sha1').update(text, 'binary').digest('hex');
