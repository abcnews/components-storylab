<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TypographyProvider from './TypographyProvider.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Typography',
    component: TypographyProvider,
    tags: ['autodocs'],
  });
</script>

<Story name="Provide @font-face definitions and basic typographic styles">
  <p>
    Any text inside the <code>&lt;TypographyProvider&gt;</code> component will be
    typeset in ABC Sans Nova by default.
  </p>

  <p>
    The component also provides CSS custom properties for a collection of other
    font stacks.
  </p>
  <ul>
    <li style="font-family: var(--sl-font-stack-serif);">
      Serifs: <code>--sl-font-stack-serif</code>
    </li>
    <li style="font-family: var(--sl-font-stack-condensed);">
      Condensed: <code>--sl-font-stack-condensed</code>
    </li>
    <li style="font-family: var(--sl-font-stack-rounded);">
      Rounded: <code>--sl-font-stack-rounded</code>
    </li>
    <li style="font-family: var(--sl-font-stack-monospace);">
      Monospace: <code>--sl-font-stack-monospace</code>
    </li>
  </ul>
</Story>

<style>
</style>
