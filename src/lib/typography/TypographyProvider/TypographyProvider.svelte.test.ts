import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";

import TypographyProvider from "./TypographyProvider.svelte";
import { createRawSnippet } from "svelte";

function css( element:HTMLElement | null, property:string ) {
    return element && window.getComputedStyle( element, null ).getPropertyValue( property );
}

describe("TypographyProvider.svelte", () => {
  it("should render content with styles", () => {
    
    const { container } = render(TypographyProvider);

    expect(container).toBeInTheDocument();
    expect(css(container.querySelector('[class^="svelte"]'), 'font-family')).toBe('abcsans, -apple-system, blinkmacsystemfont, "Segoe UI", Roboto, "Helvetica Neue", arial, sans-serif');
    
  });

  it("should render children", () => {
    const children = createRawSnippet(() => ({
      render: () => `<span>Hello World</span>`,
    }));

    const { getByText } = render(TypographyProvider, {
      children,
    });

    expect(getByText("Hello World")).toBeInTheDocument();
  });

});
