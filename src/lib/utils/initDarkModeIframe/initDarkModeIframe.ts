/**
 * Initializes dark mode inside an iframe, synchronizing with the parent site or system preferences.
 *
 * The function follows this priority:
 * 1. **URL Parameter**: Uses `?scheme=light|dark` if provided (required for Odysseys).
 * 2. Observes the `data-scheme` attribute for instant synchronization.
 *
 * Provies a data-scheme attribute on the root that you can target.
 */
export default function initDarkModeIframe() {
  const doc = document.documentElement;
  const setScheme = (isDark: boolean) =>
    (doc.dataset["scheme"] = isDark ? "dark" : "light");

  const params = new URLSearchParams(window.location.search);
  if (params.get("scheme")) {
    // if the iframe has a hard-coded "scheme" in the url, just use that
    // these must be used in Odysseys, otherwise we'll get the site-wide theme.
    setScheme(params.get("scheme") === "dark");
  } else {
    // use prefers-colour-scheme in other cases. Works in news web, app, and
    // when the colour preference has been overridden by the site controls.
    setScheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setScheme(e.matches));
  }
}
