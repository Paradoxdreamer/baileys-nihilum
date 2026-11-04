// language: Node.js
'use strict';

const raw = require('./raw');
const interactive = require('./interactive');
const call = require('./call');
const attach = require('./attach');
const shop = require('./shop');

module.exports = {
  ...raw,
  ...interactive,
  ...call,
  ...attach,
  ...shop,
};
