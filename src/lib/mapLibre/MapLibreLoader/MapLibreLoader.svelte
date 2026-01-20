<script lang="ts">
  import { onMount, setContext, untrack } from "svelte";
  import { loadMapLibre } from "../utils.ts";
  import type { maplibregl } from "../maplibre.d.ts";
  type Props = {
    rootElStyle?: string;
    onLoad: ({}: {
      rootNode: HTMLDivElement;
      maplibregl: typeof maplibregl;
    }) => maplibregl.Map | Promise<maplibregl.Map> | void | Promise<void>;
    onTeardown?: () => void | Promise<void>;
  };
  const { rootElStyle = "width:100%;height:100%;", onLoad }: Props = $props();
  let rootNode = $state<HTMLDivElement>();
  let status = $state<"loading" | "loaded">("loading");
  let mapInstance = $state<{ map: maplibregl.Map | void }>({ map: undefined });
  setContext("mapInstance", mapInstance);

  onMount(async () => {
    if (!rootNode) {
      return;
    }
    await loadMapLibre();
    const newMapInstance = await onLoad({
      rootNode,
      maplibregl: window.maplibregl,
    });
    mapInstance.map = newMapInstance;
    status = "loaded";
  });
</script>

<div class="maplibre" bind:this={rootNode} style={rootElStyle}></div>

<style>
  .maplibre {
    width: 100%;
    height: 100%;
  }
</style>
