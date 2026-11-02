# Patch plan — baileys-nihilum

Apply only after full WhiskeySockets/Baileys source lives in this repo.

## Priority 1 — raw send path

- Expose `sock.sendNode(node)` without internal drops
- Add `sock.sendRawMessage(jid, protoMessage, opts)` that skips high-level validation
- Batch helper: `sock.sendBurst(nodes | messages[], { concurrency, delayMs })`

## Priority 2 — reduce sanitize

Locations that often strip or reject useful payloads (names vary by Baileys version):

- text length / buffer checks before encode
- button / nativeFlow JSON size limits
- media message construction requiring real upload
- jid normalize that breaks intentional edge JIDs

Prefer: **warn + allow** in nihilum builds, not hard throw.

## Priority 3 — interactive / biz / call

- First-class `relayInteractive(jid, content, additionalNodes)`
- Call offer / terminate helpers that match current WA web binary fields
- Biz node attach helper (actual_actors / host_storage / native_flow attrs)

## Priority 4 — NIHILUM integration

- Keep package name compatible with `@whiskeysockets/baileys` require path
- Export same surface as upstream + `nihilum` namespace:
  ```js
  const { default: makeWASocket, nihilum } = require('@whiskeysockets/baileys')
  // nihilum.sendBurst(sock, ...)
  ```

## Do not break

- multi-file auth state
- QR / pairing code
- basic group metadata fetch
- creds.update persistence
