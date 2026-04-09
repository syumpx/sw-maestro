"use client";

function getSessionId(): string {
  const key = "analytics_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
) {
  try {
    const payload = JSON.stringify({
      name,
      properties,
      sessionId: getSessionId(),
      pathname: window.location.pathname,
      referrer: document.referrer || undefined,
    });

    const url = "/api/events";

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, payload);
    } else {
      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics should never throw
  }
}
