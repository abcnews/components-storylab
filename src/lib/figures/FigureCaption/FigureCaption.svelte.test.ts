import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { createRawSnippet } from "svelte";

import FigureCaption from "./FigureCaption.svelte";

describe("FigureCaption.svelte", () => {
  it("should render children", () => {
    const children = createRawSnippet(() => ({
      render: () => `<span>Source: BOM</span>`,
    }));

    const { getByText } = render(FigureCaption, { children });

    expect(getByText("Source: BOM")).toBeInTheDocument();
  });
});
