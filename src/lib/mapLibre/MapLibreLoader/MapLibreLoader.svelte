<script lang="ts">
  /**
   * @file
   * Call back when MapLibre is loaded with the maplibre namespace and a root
   * node for you to use.
   *
   * The return value of onLoad is set to the context as `mapInstance` so you
   * can split up your viz and access it in child components for clarity.
   */
  import { onMount, setContext } from "svelte";
  import { loadMapLibre } from "../utils.ts";
  import type { maplibregl } from "../maplibre.d.ts";
  type Props = {
    rootElStyle?: string;
    onLoad: ({}: {
      rootNode: HTMLDivElement;
      maplibregl: typeof maplibregl;
    }) => void | Promise<void>;
  };
  const { rootElStyle = "width:100%;height:100%;", onLoad }: Props = $props();
  let rootNode = $state<HTMLDivElement>();

  onMount(async () => {
    const maplibregl = await loadMapLibre();
    if (!rootNode) {
      // we don't need to handle this edge case because it will never happen but
      // TypeScript needs it here.
      return;
    }
    const mapInstance = onLoad({ rootNode, maplibregl });
    setContext("mapInstance", mapInstance);
  });
</script>

<div class="maplibre" bind:this={rootNode} style={rootElStyle}></div>

<style>
  .maplibre {
    width: 100%;
    height: 100%;
  }
</style>
