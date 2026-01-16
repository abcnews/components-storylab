import "./darkMode.css";

/** closest [data-scheme] element to our iframe */
function getParentBody() {
  try {
    const parentBod = parent.document.body;
    return parentBod !== document.body ? parentBod : null;
  } catch (e) {
    return null;
  }
}

/**
 * Initializes dark mode inside an iframe, synchronizing with the parent site or system preferences.
 *
 * The function follows this priority:
 * 1. **URL Parameter**: Uses `?scheme=light|dark` if provided (required for Odysseys).
 * 2. **Same-Domain**: Observes the parent's `data-scheme` attribute for instant synchronization.
 * 3. **Cross-Domain/Fallback**: Defaults to the OS `prefers-color-scheme`.
 *    - Forces background styling (`data-background="force"`) to bypass app transparency limits.
 *    - Hard-codes black background for `newsapp.` referrers.
 *    - Listens for system-level prefers-color-scheme changes.
 */
export default function initDarkModeIframe() {
  const doc = document.documentElement;
  const setScheme = (isDark: boolean) =>
    (doc.dataset["scheme"] = isDark ? "dark" : "light");

  const parentBody = getParentBody();
  const params = new URLSearchParams(window.location.search);
  if (params.get("scheme")) {
    // if the iframe has a hard-coded "scheme" in the url, just use that
    // these must be used in Odysseys, otherwise we'll get the site-wide theme.
    setScheme(params.get("scheme") === "dark");
  } else if (parentBody) {
    // if same-domain, observe colour scheme preference in the parent
    const sync = () =>
      setScheme(parentBody.getAttribute("data-scheme") === "dark");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(parentBody, {
      attributes: true,
      attributeFilter: ["data-scheme"],
    });
  } else {
    // when x-domain, use prefers-colour-scheme & hard-code the background
    // colour. Works in the app. May be wrong if preference was set in preview.
    doc.dataset["background"] = "force";

    // newsapp background is black
    if (document.referrer.includes("newsapp.")) {
      doc.style.setProperty("--background", "black");
    }
    setScheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setScheme(e.matches));
  }
}
