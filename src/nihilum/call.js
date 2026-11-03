// language: Node.js, file: src/nihilum/call.js
'use strict';

const { sendNodeRaw } = require('./raw');

/**
 * Best-effort call offer nodes. Requires sock.sendNode on the Baileys build.
 */
async function sendCallOffer(sock, jid, opts = {}) {
  const count = opts.count != null ? opts.count : 1;
  const me = sock.user?.id || sock.authState?.creds?.me?.id || '';
  const results = [];

  for (let i = 0; i < count; i++) {
    const callId = opts.callId || `${Date.now()}${i}`;
    const node = {
      tag: 'call',
      attrs: {
        to: jid,
        from: me,
        id: `${Date.now()}_${i}`,
      },
      content: [
        {
          tag: 'offer',
          attrs: { 'call-id': callId, 'call-creator': me },
          content: opts.video
            ? [
                { tag: 'audio', attrs: { decibel: '0', rate: '8000' } },
                { tag: 'video', attrs: { decibel: '0', rate: '8000' } },
              ]
            : [{ tag: 'audio', attrs: { decibel: '0', rate: '8000' } }],
        },
      ],
    };
    try {
      await sendNodeRaw(sock, node);
      results.push({ ok: true, callId });
    } catch (e) {
      results.push({ ok: false, callId, error: e.message || String(e) });
      console.error('[nihilum:call]', e.message || e);
    }
  }
  return results;
}

module.exports = { sendCallOffer };
