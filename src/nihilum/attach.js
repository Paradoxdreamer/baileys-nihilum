// language: Node.js, file: src/nihilum/attach.js
'use strict';

const { relayRaw, sendNodeRaw, sendBurst, bizInteractiveNodes } = require('./raw');
const { sendNativeFlow, sendSingleSelect, sendChannelInviteButton } = require('./interactive');
const { sendCallOffer } = require('./call');

function isNihilumSock(sock) {
  return !!(sock && sock.nihilum && sock.nihilum.__nihilum === true);
}

/**
 * Bind sock.nihilum.* so attack code can call sock-local helpers.
 * Safe to call multiple times (idempotent).
 */
function attachNihilum(sock) {
  if (!sock) return sock;
  if (sock.nihilum && sock.nihilum.__nihilum) return sock;

  sock.nihilum = {
    __nihilum: true,
    version: '1.0.0',
    relayRaw: (jid, content, opts) => relayRaw(sock, jid, content, opts),
    sendNodeRaw: (node) => sendNodeRaw(sock, node),
    sendBurst: (tasks, c, o) => sendBurst(tasks, c, o),
    sendNativeFlow: (jid, opts) => sendNativeFlow(sock, jid, opts),
    sendSingleSelect: (jid, opts) => sendSingleSelect(sock, jid, opts),
    sendChannelInviteButton: (jid, opts) => sendChannelInviteButton(sock, jid, opts),
    sendCallOffer: (jid, opts) => sendCallOffer(sock, jid, opts),
    bizInteractiveNodes,
  };

  return sock;
}

module.exports = {
  attachNihilum,
  isNihilumSock,
};
