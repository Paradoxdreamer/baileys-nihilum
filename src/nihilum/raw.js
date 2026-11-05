// language: Node.js, file: src/nihilum/raw.js
// Raw relay / node / burst — hardened for Paradox Baileys (userJid required)
'use strict';

function getBaileys() {
  return require('@whiskeysockets/baileys');
}

function resolveUserJid(sock, opts = {}) {
  return (
    opts.userJid ||
    opts.generateOpts?.userJid ||
    sock?.user?.id ||
    sock?.authState?.creds?.me?.id ||
    sock?.user?.jid ||
    ''
  );
}

function bizInteractiveNodes(flowName = 'mixed') {
  return [
    {
      tag: 'biz',
      attrs: { actual_actors: '2', host_storage: '2' },
      content: [
        {
          tag: 'interactive',
          attrs: { type: 'native_flow', v: '1' },
          content: [{ tag: 'native_flow', attrs: { v: '9', name: flowName } }],
        },
      ],
    },
  ];
}

/**
 * Build WAMessageContent and relay — prefers sock.relayMessage
 * Always injects userJid for generateWAMessageFromContent (Paradox Baileys).
 */
async function relayRaw(sock, jid, content, opts = {}) {
  if (!sock) throw new Error('relayRaw: no sock');
  if (!jid) throw new Error('relayRaw: no jid');

  if (typeof sock.relayMessage !== 'function') {
    if (content?.interactiveMessage && typeof sock.sendMessage === 'function') {
      return sock.sendMessage(jid, content.interactiveMessage);
    }
    throw new Error('relayRaw: relayMessage unavailable');
  }

  const { generateWAMessageFromContent } = getBaileys();
  const userJid = resolveUserJid(sock, opts);
  const generateOpts = { ...(opts.generateOpts || {}), userJid };

  const full = generateWAMessageFromContent(jid, content, generateOpts);
  const messageId = opts.messageId || full.key?.id;

  await sock.relayMessage(jid, full.message, {
    messageId,
    additionalNodes: opts.additionalNodes,
    additionalAttributes: opts.additionalAttributes,
  });
  return full;
}

/**
 * Send a binary-tree node if the socket exposes sendNode
 */
async function sendNodeRaw(sock, node) {
  if (!sock) throw new Error('sendNodeRaw: no sock');
  if (typeof sock.sendNode === 'function') return sock.sendNode(node);
  if (typeof sock.query === 'function' && node?.tag) {
    return sock.query(node);
  }
  throw new Error('sendNodeRaw: sendNode not available on this Baileys build');
}

/**
 * Limited-concurrency task runner
 * @param {Array<() => Promise>} tasks
 * @param {number} concurrency
 * @param {{ swallow?: boolean }} opts — swallow default true for attack firehose
 */
async function sendBurst(tasks, concurrency = 8, opts = {}) {
  const swallow = opts.swallow !== false;
  const queue = tasks.slice();
  const errors = [];
  const n = Math.min(Math.max(1, concurrency), queue.length || 1);

  await Promise.all(
    Array.from({ length: n }, async () => {
      while (queue.length) {
        const t = queue.shift();
        if (!t) break;
        try {
          await t();
        } catch (e) {
          errors.push(e);
          if (!swallow) console.error('[nihilum:burst]', e.message || e);
        }
      }
    })
  );

  return { ok: errors.length === 0, errors };
}

module.exports = {
  relayRaw,
  sendNodeRaw,
  sendBurst,
  bizInteractiveNodes,
  resolveUserJid,
  getBaileys,
};
