<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MapLibreLoader from "./MapLibreLoader.svelte";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "MapLibre/MapLibreLoader",
    component: MapLibreLoader,
    tags: ["autodocs"],
  });
</script>

<Story
  name="Bright style"
  args={{
    rootElStyle: "width:100%;height:calc(100dvh - 2rem);",
    onLoad: async ({ rootNode, maplibregl }) => {
      const map = new maplibregl.Map({
        zoom: 3,
        minZoom: 2,
        maxZoom: 22,
        attributionControl: false,
        dragRotate: false,
        doubleClickZoom: false,
        style:
          "https://www.abc.net.au/res/sites/news-projects/map-vector-style-bright/style.json",
        container: rootNode,
        interactive: true,
        cooperativeGestures: true,
        center: [133.28, -28.15],
      });
      return map;
    },
  }}
></Story>
<Story
  name="Light style"
  args={{
    rootElStyle: "width:100%;height:calc(100dvh - 2rem);",
    onLoad: async ({ rootNode, maplibregl }) => {
      const map = new maplibregl.Map({
        zoom: 3,
        minZoom: 2,
        maxZoom: 22,
        attributionControl: false,
        dragRotate: false,
        doubleClickZoom: false,
        style:
          "https://www.abc.net.au/res/sites/news-projects/map-vector-style-light/style.json",
        container: rootNode,
        interactive: true,
        cooperativeGestures: true,
        center: [133.28, -28.15],
      });
      return map;
    },
  }}
></Story>
