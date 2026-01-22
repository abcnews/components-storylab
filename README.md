# 📖 🧪 components-storylab

A live repo containing reusable components and snippts by Story Lab. This repo is subject to change.

## Installation

1. Install the package:
   ```sh
   npm i @abcnews/components-storylab
   ```
2. Add the package to your `aunty` config's `includedDependencies` array in `package.json` so it gets built properly:
   ```js
     "aunty": {
       "type": "svelte",
       "build": {
         "includedDependencies": [
           "@abcnews/components-storylab"
         ]
       }
     }
   ```

## Components

### 🌃 initDarkModeIframe

Initializes dark mode inside an iframe, synchronizing with the parent site or system preferences.

```ts
import { initDarkModeIframe } from "@abcnews/components-storylab";

// Initialise this as early as possible to prevent flashes
// of the wrong background colour.
initDarkModeIframe();
```

### 🌏 MapLibre

Tools and components for working with MapLibre. The `utils` export gives you the
tools to do this yourself, whereas the MapLibreLoader component handles it for
you in Svelte. Import these from `@abcnews/components-storylab/mapLibre`.

#### MapLibreLoader

Call back when MapLibre is loaded. Passes the `maplibre` namespace and a root
node for you to use.

```ts
import type { maplibregl } from "@abcnews/components-storylab/mapLibre";
import { MapLibreLoader, utils } from "@abcnews/components-storylab/mapLibre";

// Load MapLibre and use it in your component
const { loadMapLibre, STYLE_BRIGHT, STYLE_LIGHT } = utils;

// Example of using MapLibreLoader in a Svelte component
<MapLibreLoader
  onLoad={({ rootNode, maplibregl }) => {
    const map = new maplibregl.Map({
      container: rootNode,
      style: STYLE_BRIGHT,
    });
    return map;
  }}
/>
```

If you return the Map from `onLoad`, you can componentise your viz and access it
from child components with:

```ts
let { map } = getContext<Map>("mapInstance");
```

This component will attempt to keep the map stable, so you can not change
props after the fact. If you want to destroy the map and create a new one
when props change, wrap it in a {#key}{/key} block/

## Developing

See [DEVELOPMENT.md](DEVELOPMENT.md)
