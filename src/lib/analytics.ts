/// <reference types="gtag.js" />

/**
 * Fires a GA4 custom event via the global gtag() function.
 *
 * Guards against:
 *  - Server-side rendering (window is not defined)
 *  - gtag not yet loaded (race condition on slow connections)
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
