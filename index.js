// language: Node.js, file: index.js
// @paradoxdreamer/baileys-nihilum — socket layer on top of Paradox/Whiskey Baileys
'use strict';

// Re-export host Baileys so Nihilum can depend on one package path if desired.
// Peer: @whiskeysockets/baileys (aliased to @paradoxdreamer/baileys in Nihilum).
let baileys;
try {
  baileys = require('@whiskeysockets/baileys');
} catch (e) {
  baileys = null;
}

const nihilum = require('./src/nihilum');

module.exports = {
  // drop-in helpers
  ...nihilum,
  // host library (if installed)
  baileys,
  makeWASocket: baileys?.default || baileys?.makeWASocket,
  // explicit
  attachNihilum: nihilum.attachNihilum,
  isNihilumSock: nihilum.isNihilumSock,
};
