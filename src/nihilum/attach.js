// language: Node.js, file: src/nihilum/attach.js
'use strict';

const { relayRaw, sendNodeRaw, sendBurst, bizInteractiveNodes } = require('./raw');
const { sendNativeFlow, sendSingleSelect, sendChannelInviteButton } = require('./interactive');
const { sendCallOffer } = require('./call');
const { sendOfferLabel, sendProductCard } = require('./shop');

const NIHILUM_VERSION = '1.2.0';

function isNihilumSock(sock) {
  return !!(sock && sock.nihilum && sock.nihilum.__nihilum === true);
}

/**
 * Bind sock.nihilum API. Idempotent — safe to call on every connection.open.
 */
function attachNihilum(sock) {
  if (!sock) return sock;
  if (sock.nihilum && sock.nihilum.__nihilum) {
    // refresh version label if older attach left a stub
    sock.nihilum.version = NIHILUM_VERSION;
    return sock;
  }

  sock.nihilum = {
    __nihilum: true,
    version: NIHILUM_VERSION,
    relayRaw: (jid, content, opts) => relayRaw(sock, jid, content, opts),
    sendNodeRaw: (node) => sendNodeRaw(sock, node),
    sendBurst: (tasks, c, o) => sendBurst(tasks, c, o),
    sendNativeFlow: (jid, opts) => sendNativeFlow(sock, jid, opts),
    sendSingleSelect: (jid, opts) => sendSingleSelect(sock, jid, opts),
    sendChannelInviteButton: (jid, opts) => sendChannelInviteButton(sock, jid, opts),
    sendCallOffer: (jid, opts) => sendCallOffer(sock, jid, opts),
    sendOfferLabel: (jid, opts) => sendOfferLabel(sock, jid, opts),
    sendProductCard: (jid, opts) => sendProductCard(sock, jid, opts),
    bizInteractiveNodes,
  };

  return sock;
}

module.exports = {
  attachNihilum,
  isNihilumSock,
  NIHILUM_VERSION,
};
