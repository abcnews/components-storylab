<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FigureCaption from './FigureCaption.svelte';

  const { Story } = defineMeta({
    title: 'Figures/FigureCaption',
    component: FigureCaption,
    tags: ['autodocs'],
  });
</script>

<Story name="Attribution with links">
  <FigureCaption>
    Data: <a href="https://www.bom.gov.au/">Bureau of Meteorology</a>,
    <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
  </FigureCaption>
</Story>
