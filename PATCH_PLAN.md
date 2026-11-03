# Patch plan — baileys-nihilum

## Status: v1.0.0 COMPLETE (socket layer)

Implemented without mirroring full upstream source:

| Item | Status |
|------|--------|
| relayRaw | done |
| sendNodeRaw | done (requires host sendNode) |
| sendBurst | done |
| bizInteractiveNodes | done |
| sendNativeFlow / singleSelect / channel invite | done |
| sendCallOffer | done |
| attachNihilum | done |
| package main export | done |

## Optional Phase 2 — full upstream mirror

Only if you need **in-library** sanitize removal (text length, button JSON limits, media upload hard-require):

1. Mirror WhiskeySockets/Baileys (or Paradox Baileys source) into this repo
2. Soften validators to warn-not-throw in nihilum builds
3. Keep package name compatible with `@whiskeysockets/baileys` require path

Until then, Nihilum correctly uses:

- protocol/UI: `@paradoxdreamer/baileys` via alias
- offensive helpers: `@paradoxdreamer/baileys-nihilum`

## Do not break

- multi-file auth state
- QR / pairing code
- group metadata
- creds.update persistence
