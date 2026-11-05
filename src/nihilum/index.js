// language: Node.js, file: src/nihilum/index.js
'use strict';

const raw = require('./raw');
const interactive = require('./interactive');
const call = require('./call');
const attach = require('./attach');
const shop = require('./shop');

module.exports = {
  relayRaw: raw.relayRaw,
  sendNodeRaw: raw.sendNodeRaw,
  sendBurst: raw.sendBurst,
  bizInteractiveNodes: raw.bizInteractiveNodes,
  resolveUserJid: raw.resolveUserJid,
  getBaileys: raw.getBaileys,

  sendNativeFlow: interactive.sendNativeFlow,
  sendSingleSelect: interactive.sendSingleSelect,
  sendChannelInviteButton: interactive.sendChannelInviteButton,

  sendCallOffer: call.sendCallOffer,

  sendOfferLabel: shop.sendOfferLabel,
  sendProductCard: shop.sendProductCard,

  attachNihilum: attach.attachNihilum,
  isNihilumSock: attach.isNihilumSock,
  NIHILUM_VERSION: attach.NIHILUM_VERSION,
};
