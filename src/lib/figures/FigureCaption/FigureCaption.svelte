<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** Caption or attribution text and links */
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<p class="figure-caption">{@render children()}</p>

<style>
  /* Typography matches ABC figure captions; colours are inherited so the host page controls them. */
  .figure-caption {
    box-sizing: border-box;
    margin: 0;
    color: inherit;
    font-family: ABCSans, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;

    :global(a) {
      color: inherit;
      text-decoration: none;
    }

    :global(a:hover) {
      text-decoration: underline;
    }
  }
</style>
