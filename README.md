# @paradoxdreamer/baileys-nihilum

**Socket layer** for Paradox Nihilum. Sits on `@paradoxdreamer/baileys` (required as `@whiskeysockets/baileys`).

| Package | Role |
|---------|------|
| `@paradoxdreamer/baileys` | Protocol + UI |
| `@paradoxdreamer/baileys-nihilum` | Raw relay, burst, native_flow, SSL, call, channel invite |

## Install

```bash
npm install @paradoxdreamer/baileys-nihilum
# or until published:
npm install github:Paradoxdreamer/baileys-nihilum#main
```

Peer:

```json
"@whiskeysockets/baileys": "npm:@paradoxdreamer/baileys@next"
```

## Usage

```js
const { attachNihilum, isNihilumSock } = require('@paradoxdreamer/baileys-nihilum');

const sock = makeWASocket({ ... });
attachNihilum(sock); // call on every open — idempotent

// sock.nihilum.relayRaw / sendBurst / sendNativeFlow / ...
```

## API

- **relayRaw(sock, jid, content, opts)** — always injects `userJid` for Paradox Baileys
- **sendNodeRaw(sock, node)**
- **sendBurst(tasks, concurrency, { swallow })**
- **sendNativeFlow / sendSingleSelect / sendChannelInviteButton**
- **sendCallOffer(sock, jid, { count, video })**
- **sendOfferLabel / sendProductCard**
- **attachNihilum(sock)** / **isNihilumSock(sock)**

## Version

**1.2.0** — userJid hardened, attach idempotent, publish-ready.
