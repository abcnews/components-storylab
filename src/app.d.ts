// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type * as MapLibreGL from "./lib/MapLibreLoader/maplibre-gl.js";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    maplibregl: typeof MapLibreGL;
  }
}

export {};
