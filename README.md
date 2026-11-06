<div align="center">

# @paradoxdreamer/baileys-nihilum

**Socket layer for PARADOX NIHILUM.**  
*Raw relay · burst · interactive · call — on top of Paradox Baileys.*

<br/>

<a href="https://www.npmjs.com/package/@paradoxdreamer/baileys-nihilum">
  <img src="https://img.shields.io/badge/npm-1.2.0-c41e3a?style=for-the-badge&logo=npm&logoColor=white" alt="npm"/>
</a>
<a href="https://www.npmjs.com/package/@paradoxdreamer/baileys">
  <img src="https://img.shields.io/badge/peer-@paradoxdreamer%2Fbaileys-00D4C8?style=for-the-badge" alt="baileys"/>
</a>
<a href="#">
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="node"/>
</a>
<a href="#">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="mit"/>
</a>

<br/>

<sub>Published on the public npm registry · install by package name</sub>

</div>

---

<details open>
<summary><b>// This is</b></summary>
<br/>

Offensive helper layer used by **Paradox-Nihilum**. Not a full Baileys re-fork — a complete `sock.nihilum` API on **`@paradoxdreamer/baileys`**.

| thing | reality |
|:------|:--------|
| **npm name** | `@paradoxdreamer/baileys-nihilum` |
| **version** | **1.2.0** (published) |
| registry | [npmjs.com/package/@paradoxdreamer/baileys-nihilum](https://www.npmjs.com/package/@paradoxdreamer/baileys-nihilum) |
| peer | `@whiskeysockets/baileys` → alias `npm:@paradoxdreamer/baileys@next` |

</details>

---

<details open>
<summary><b>// install (npm — preferred)</b></summary>
<br/>

```bash
npm install @paradoxdreamer/baileys-nihilum@1.2.0
```

With Paradox Baileys:

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@paradoxdreamer/baileys@next",
    "@paradoxdreamer/baileys-nihilum": "^1.2.0"
  }
}
```

Dev-only git install (not needed for panels):

```bash
npm install github:Paradoxdreamer/baileys-nihilum#main
```

</details>

---

<details>
<summary><b>// usage</b></summary>
<br/>

```js
const { attachNihilum, isNihilumSock } = require('@paradoxdreamer/baileys-nihilum');

const sock = makeWASocket({ /* ... */ });
attachNihilum(sock); // call on every connection.open — idempotent

// sock.nihilum.relayRaw / sendBurst / sendNativeFlow / ...
```

| method | job |
|:-------|:----|
| `relayRaw` | `generateWAMessageFromContent` + `relayMessage` · **injects `userJid`** |
| `sendNodeRaw` | binary node via `sendNode` |
| `sendBurst` | concurrent task firehose |
| `sendNativeFlow` / `sendSingleSelect` | interactive + SSL menus |
| `sendChannelInviteButton` | channel CTA + newsletter context |
| `sendCallOffer` | call offer nodes |
| `sendOfferLabel` / `sendProductCard` | commerce-style CTAs |
| `attachNihilum` / `isNihilumSock` | bind / detect |

</details>

---

<details>
<summary><b>// stack with NIHILUM</b></summary>
<br/>

```text
@paradoxdreamer/baileys@next     protocol + UI
@paradoxdreamer/baileys-nihilum@1.2.0   this layer
paradox-nihilum@4.7.0            bot / C2 / arsenal
```

Paradox-Nihilum loads this package first; if missing, falls back to `utils/nihilum_sock.js` inline surface.

</details>

---

<div align="center">

<br/>

**Powered by: Paradox Overlord**

<sub>MIT · © Paradoxdreamer · npm `@paradoxdreamer/baileys-nihilum@1.2.0`</sub>

<br/>

```text
Built with curiosity.
Refined through failure.
Shipped anyway.
```

</div>
