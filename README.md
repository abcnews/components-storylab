# 📖 🧪 components-storylab

A live repo containing reusable components and snippts by Story Lab. This repo is subject to change.

## Components

### initDarkModeIframe

Initializes dark mode inside an iframe, synchronizing with the parent site or system preferences.

```ts
import { initDarkModeIframe } from "@abcnews/components-storylab";

// Initialise this as early as possible to prevent flashes
// of the wrong background colour.
initDarkModeIframe();
```

## Developing

See [DEVELOPMENT.md](DEVELOPMENT.md)

Note: I haven't been able to `npm link` svelte components into an Aunty project. If you work this out please let me know.
