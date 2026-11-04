// language: Node.js, file: src/nihilum/shop.js
// Commerce-style interactive helpers (labels/offers/CTAs — not Meta catalog IDs)
'use strict';

const { relayRaw, bizInteractiveNodes } = require('./raw');
const { sendNativeFlow } = require('./interactive');

/**
 * "Label-like" offer strip via native_flow:
 * offer text + copy code + optional URL — single interactive message.
 * This is the legitimate client UI path forks use (offerText/offerCode style),
 * not a fake Meta Commerce catalog product id.
 */
async function sendOfferLabel(sock, jid, opts = {}) {
  const title = opts.title || 'Paradox';
  const body = opts.body || title;
  const code = opts.code || 'PARADOX';
  const url = opts.url || 'https://t.me/paradoxoverlord';
  const price = opts.price || '';
  const display = opts.displayText || (price ? `Get ${price}` : 'Claim');

  const buttons = [
    {
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: opts.copyText || `Copy ${code}`,
        copy_code: code,
      }),
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: display,
        url,
        merchant_url: url,
      }),
    },
  ];

  if (opts.call) {
    buttons.push({
      name: 'cta_call',
      buttonParamsJson: JSON.stringify({
        display_text: opts.callText || 'Call',
        phone_number: String(opts.call).replace(/\D/g, ''),
      }),
    });
  }

  const messageParamsJson = JSON.stringify({
    from: 'paradox-nihilum',
    offer: code,
    price: price || undefined,
    brand: opts.brand || 'Paradox Overlord',
  });

  return sendNativeFlow(sock, jid, {
    body: [body, price ? `Tag · ${price}` : '', opts.footerLine || '']
      .filter(Boolean)
      .join('\n'),
    footer: opts.footer || 'Powered by: Paradox Overlord',
    buttons,
    messageParamsJson,
    flowName: opts.flowName || 'mixed',
    additionalNodes: opts.additionalNodes || bizInteractiveNodes('mixed'),
  });
}

/**
 * Product-card style interactive (image header when host supports it via content).
 * Uses interactiveMessage header title + native flow CTAs — one message.
 */
async function sendProductCard(sock, jid, opts = {}) {
  const content = {
    interactiveMessage: {
      body: { text: opts.body || opts.title || 'Item' },
      footer: opts.footer ? { text: opts.footer } : { text: 'Paradox Overlord' },
      header: opts.title
        ? { title: opts.title, hasMediaAttachment: false }
        : undefined,
      nativeFlowMessage: {
        buttons: (opts.buttons || [
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: opts.ctaText || 'Open',
              url: opts.url || 'https://t.me/paradoxoverlord',
            }),
          },
          {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: opts.copyText || 'Copy code',
              copy_code: opts.code || 'PARADOX',
            }),
          },
        ]),
        messageParamsJson: JSON.stringify({
          product_name: opts.title || 'Paradox',
          price: opts.price || '',
          brand: opts.brand || 'Paradox',
        }),
      },
    },
  };

  return relayRaw(sock, jid, content, {
    additionalNodes: opts.additionalNodes || bizInteractiveNodes('mixed'),
  });
}

module.exports = {
  sendOfferLabel,
  sendProductCard,
};
