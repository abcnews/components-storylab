import type { maplibregl } from "./maplibre.d.ts";
export const MAPLIBRE_JS_URL =
  "https://www.abc.net.au/res/sites/news-projects/maplibre/v5.x.x-latest/maplibre-gl.js";
export const MAPLIBRE_CSS_URL =
  "https://www.abc.net.au/res/sites/news-projects/maplibre/v5.x.x-latest/maplibre-gl.css";

/** Colourful style */
export const STYLE_BRIGHT =
  "https://www.abc.net.au/res/sites/news-projects/map-vector-style-bright/style.json";
/** Grey style */
export const STYLE_LIGHT =
  "https://www.abc.net.au/res/sites/news-projects/map-vector-style-light/style.json";

const promises: Record<string, Promise<void> | undefined> = {};

function importModule(url: string): Promise<void> {
  const key = "module" + url;
  const promise = promises[key];
  if (promise) {
    return promise;
  }
  const newPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.type = "module";
    s.addEventListener("load", () => resolve());
    s.addEventListener("error", reject);
    document.head.appendChild(s);
  });
  promises[key] = newPromise;
  return newPromise;
}

function loadCss(url: string): Promise<void> {
  const key = "css" + url;
  const promise = promises[key];
  if (promise) {
    return promise;
  }
  const newPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("link");
    s.rel = "stylesheet";
    s.type = "text/css";
    s.href = url;
    s.addEventListener("load", () => resolve());
    s.addEventListener("error", reject);
    document.head.appendChild(s);
  });
  promises[key] = newPromise;
  return newPromise;
}

/**
 * Load common MapLibre version from news-projects.
 *
 * To keep bundle sizes, deploys, and end user downloads svelte, we can load
 * MapLibre from news-projects. This version is updated only when the major
 * version changes, which should be safe given semver conventions.
 *
 * - Regular visitors should only need to download & parse MapLibre once, ever,
 *   no matter how many different deploys or projects they hit.
 * - Build sizes stay small, preventing duplication & deploy size blowouts
 * - Build times are quicker with MapLibre externalised.
 */
export async function loadMapLibre(): Promise<typeof maplibregl> {
  await Promise.all([importModule(MAPLIBRE_JS_URL), loadCss(MAPLIBRE_CSS_URL)]);
  return window.maplibregl as typeof maplibregl;
}
