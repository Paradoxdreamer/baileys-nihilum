// language: Node.js, file: index.js
// @paradoxdreamer/baileys-nihilum — socket layer on top of Paradox/Whiskey Baileys
'use strict';

let baileys = null;
try {
  baileys = require('@whiskeysockets/baileys');
} catch (_) {
  baileys = null;
}

const nihilum = require('./src/nihilum');

module.exports = {
  ...nihilum,
  baileys,
  makeWASocket: baileys?.default || baileys?.makeWASocket,
  attachNihilum: nihilum.attachNihilum,
  isNihilumSock: nihilum.isNihilumSock,
  NIHILUM_VERSION: nihilum.NIHILUM_VERSION,
};
