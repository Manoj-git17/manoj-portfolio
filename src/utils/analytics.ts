/**
 * Lightweight, privacy-friendly event tracker for Manoj's portfolio.
 * Stores anonymous click telemetry in localStorage with zero tracking cookies or PII.
 */

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  meta?: Record<string, unknown>;
}

const STORAGE_KEY = 'manoj_portfolio_telemetry_v1';
const MAX_EVENTS = 100;

export function trackEvent(event: string, meta?: Record<string, unknown>): void {
  try {
    const newEntry: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      meta,
    };

    const raw = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.push(newEntry);

    // Keep only the most recent MAX_EVENTS entries
    if (events.length > MAX_EVENTS) {
      events.splice(0, events.length - MAX_EVENTS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    // Optional lightweight background ping to backend if configured
    if (import.meta.env.VITE_API_URL) {
      fetch(`${import.meta.env.VITE_API_URL}/api/telemetry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      }).catch(() => {
        // Silently swallow network errors for analytics
      });
    }
  } catch {
    // Fail completely silently if localStorage is restricted (e.g. private mode)
  }
}

export function getTelemetrySummary(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    const counts: Record<string, number> = {};
    events.forEach((e) => {
      counts[e.event] = (counts[e.event] || 0) + 1;
    });
    return counts;
  } catch {
    return {};
  }
}
