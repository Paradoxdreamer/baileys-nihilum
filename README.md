# @paradoxdreamer/baileys-nihilum

**Socket layer** for Paradox Nihilum. Not a full re-fork of Baileys source — a complete offensive helper layer that sits on **`@paradoxdreamer/baileys`** (required as `@whiskeysockets/baileys`).

## Why this exists

| Package | Role |
|---------|------|
| `@paradoxdreamer/baileys` | Protocol + UI (interactive, carousel, pairing) |
| `@paradoxdreamer/baileys-nihilum` | Raw relay, burst, native_flow, call offer, attach API |

Upstream core stays on Paradox Baileys. Nihilum attacks call this layer (or the inlined `utils/nihilum_sock.js` fallback).

## Install (inside Paradox-Nihilum)

```bash
npm install github:Paradoxdreamer/baileys-nihilum#main
```

Peer: keep existing

```json
"@whiskeysockets/baileys": "npm:@paradoxdreamer/baileys@next"
```

## API

```js
const {
  attachNihilum,
  relayRaw,
  sendNodeRaw,
  sendBurst,
  sendNativeFlow,
  sendSingleSelect,
  sendChannelInviteButton,
  sendCallOffer,
  bizInteractiveNodes,
  isNihilumSock,
} = require('@paradoxdreamer/baileys-nihilum');

const sock = attachNihilum(makeWASocket(...));
// sock.nihilum.relayRaw / sendNativeFlow / ...
```

### Methods

- **relayRaw(sock, jid, content, opts)** — `generateWAMessageFromContent` + `relayMessage` + optional `additionalNodes`
- **sendNodeRaw(sock, node)** — `sock.sendNode` when present
- **sendBurst(tasks, concurrency, { swallow })** — concurrent firehose
- **sendNativeFlow / sendSingleSelect / sendChannelInviteButton**
- **sendCallOffer(sock, jid, { count, video })**
- **attachNihilum(sock)** — binds `sock.nihilum.*`

## PATCH_PLAN.md

Still valid if you later mirror full WhiskeySockets source into this repo for deeper sanitize removal. **v1 does not need that** to be usable.

## Version

1.0.0 — complete layer for Nihilum attacks.
