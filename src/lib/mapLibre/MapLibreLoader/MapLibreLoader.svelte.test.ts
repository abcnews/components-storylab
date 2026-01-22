import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import MapLibreLoader from "./MapLibreLoader.svelte";
import * as utils from "../utils.ts";
import { createRawSnippet } from "svelte";

vi.mock("../utils.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof utils>();
  return {
    ...actual,
    loadMapLibre: vi.fn().mockResolvedValue({}),
  };
});

describe("MapLibreLoader.svelte", () => {
  it("should render the map container with styles", () => {
    const customStyle = "width: 500px; height: 500px;";
    const { container } = render(MapLibreLoader, {
      onLoad: vi.fn(),
      rootElStyle: customStyle,
    });

    const mapDiv = container.querySelector(".maplibre") as HTMLElement;
    expect(mapDiv).toBeInTheDocument();
    expect(mapDiv.style.cssText).toContain("width: 500px");
    expect(mapDiv.style.cssText).toContain("height: 500px");
  });

  it("should render children", () => {
    const children = createRawSnippet(() => ({
      render: () => `<span id="test-child">Hello World</span>`,
    }));

    const { getByText } = render(MapLibreLoader, {
      onLoad: vi.fn(),
      children,
    });

    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("should call onLoad when MapLibre is loaded", async () => {
    const onLoad = vi.fn();

    // Mock window.maplibregl
    const mockMapLibre = {
      Map: vi.fn().mockImplementation(() => ({
        remove: vi.fn(),
      })),
    };
    (window as any).maplibregl = mockMapLibre;

    render(MapLibreLoader, {
      onLoad,
    });

    // Wait for onMount and async loadMapLibre
    await vi.waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });

    expect(onLoad).toHaveBeenCalledWith(
      expect.objectContaining({
        rootNode: expect.any(HTMLDivElement),
        maplibregl: mockMapLibre,
      }),
    );
  });
});
