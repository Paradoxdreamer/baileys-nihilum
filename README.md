# baileys-nihilum

Private workspace for a **purpose-built Baileys fork** used by Paradox Nihilum.

This is **not** a full upstream mirror yet. You create the real fork locally (or via GitHub UI), then point this repo / NIHILUM at it.

## Why a second fork?

You already have `@paradoxdreamer/baileys@next` (or similar).  
This track is a **clean fork of upstream WhiskeySockets/Baileys** dedicated to:

- raw stanza / `sendNode` first-class API
- less client-side sanitize on text, buttons, media metadata
- batch / pipeline send helpers
- interactive + call + biz node helpers aimed at NIHILUM attacks

Keep the existing package for production stability. Use this one as the experimental socket.

## Create the real fork (you run this)

GitHub API cannot always fork into your account from here. Do one of:

### Option A — GitHub UI
1. Open https://github.com/WhiskeySockets/Baileys
2. Click **Fork** → owner `Paradoxdreamer` → name e.g. `Baileys` or keep `baileys-nihilum` if you replace this repo
3. Clone your fork

### Option B — CLI
```bash
# requires gh auth
gh repo fork WhiskeySockets/Baileys --org Paradoxdreamer --clone=true
# or personal account:
gh repo fork WhiskeySockets/Baileys --clone=true
cd Baileys
git remote rename origin upstream-fork
# add this repo as origin if you want the name baileys-nihilum
```

### Option C — manual mirror into this repo
```bash
git clone https://github.com/WhiskeySockets/Baileys.git baileys-src
cd baileys-src
git remote set-url origin https://github.com/Paradoxdreamer/baileys-nihilum.git
git push -u origin master:main
# resolve branch names as needed
```

## Wire into Paradox-Nihilum

In `Paradox-Nihilum/package.json`:

```json
"@whiskeysockets/baileys": "github:Paradoxdreamer/baileys-nihilum#main"
```

or keep npm alias:

```json
"@whiskeysockets/baileys": "npm:@paradoxdreamer/baileys@next"
```

and publish experimental builds from this repo under a different tag.

## Planned patches (after full source is here)

See `PATCH_PLAN.md`.

## Layout (stubs until upstream is mirrored)

```
src/nihilum/     — raw helpers layered on Baileys socket
PATCH_PLAN.md    — what to change in upstream source
```
