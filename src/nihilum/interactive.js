// language: Node.js, file: src/nihilum/interactive.js
'use strict';

const { relayRaw, bizInteractiveNodes } = require('./raw');

async function sendNativeFlow(sock, jid, opts = {}) {
  return relayRaw(
    sock,
    jid,
    {
      interactiveMessage: {
        body: { text: opts.body || '' },
        footer: opts.footer ? { text: opts.footer } : undefined,
        nativeFlowMessage: {
          buttons: opts.buttons || [],
          messageParamsJson: opts.messageParamsJson || '{}',
        },
      },
    },
    { additionalNodes: opts.additionalNodes || bizInteractiveNodes(opts.flowName || 'mixed') }
  );
}

async function sendSingleSelect(sock, jid, opts = {}) {
  // Prefer high-level if Paradox Baileys supports list/sections on sendMessage
  if (typeof sock.sendMessage === 'function' && opts.sections) {
    try {
      return await sock.sendMessage(jid, {
        text: opts.text,
        title: opts.title,
        footer: opts.footer,
        buttonText: opts.buttonText || 'Select',
        sections: opts.sections,
      });
    } catch (_) {
      /* fall through to raw */
    }
  }

  const buttonParamsJson = JSON.stringify({
    title: opts.title || 'Menu',
    sections: (opts.sections || []).map((s) => ({
      title: s.title,
      rows: (s.rows || []).map((r) => ({
        header: r.title,
        id: r.rowId || r.id,
        title: r.title,
        description: r.description || '',
      })),
    })),
  });

  return relayRaw(
    sock,
    jid,
    {
      interactiveMessage: {
        body: { text: opts.text || '' },
        footer: opts.footer ? { text: opts.footer } : undefined,
        nativeFlowMessage: {
          buttons: [{ name: 'single_select', buttonParamsJson }],
          messageParamsJson: '{}',
        },
      },
    },
    { additionalNodes: opts.additionalNodes || bizInteractiveNodes('single_select') }
  );
}

async function sendChannelInviteButton(sock, jid, opts = {}) {
  const display = opts.displayText || 'View channel';
  const name = opts.newsletterName || 'Channel';
  const code = opts.inviteCode || '';
  const njid = opts.newsletterJid;
  const url = code
    ? `https://whatsapp.com/channel/${code}`
    : `https://whatsapp.com/channel/${String(njid || '').replace('@newsletter', '')}`;

  return relayRaw(
    sock,
    jid,
    {
      interactiveMessage: {
        body: { text: opts.body || name },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: display,
                url,
                merchant_url: url,
              }),
            },
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: 'Copy',
                copy_code: code || njid,
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            newsletter_jid: njid,
            newsletter_name: name,
            invite_code: code,
          }),
        },
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: njid,
            newsletterName: name,
            serverMessageId: -1,
          },
        },
      },
    },
    { additionalNodes: bizInteractiveNodes('cta_url') }
  );
}

module.exports = {
  sendNativeFlow,
  sendSingleSelect,
  sendChannelInviteButton,
};
