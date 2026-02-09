import ReactGA4 from "react-ga4";

/// <reference types="vite/client" />

const rawMeasurementId = (import.meta.env.VITE_GA_ID ?? "").trim();
const measurementId = rawMeasurementId || undefined;
// Gate GA debug mode to explicit non-local environments (e.g., staging/prod).
const analyticsEnv = (import.meta.env.VITE_ENV ?? "").trim().toLowerCase();
const allowDebugEvents =
  analyticsEnv && analyticsEnv.length > 0 &&
  analyticsEnv !== "local" &&
  analyticsEnv !== "dev" &&
  analyticsEnv !== "development";

let initialized = false;

const isBrowser = typeof window !== "undefined";
const isValidMeasurementId = (value: string) => /^G-[A-Z0-9]+$/i.test(value);

const canInitialize = () => {
  if (initialized) {
    return true;
  }

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.warn(
        "[analytics] Unable to initialize Google Analytics: missing VITE_GA_ID",
      );
    }
    return false;
  }

  if (!isValidMeasurementId(measurementId)) {
    console.warn(
      `[analytics] Skipping Google Analytics init: invalid measurement id "${measurementId}"`,
    );
    return false;
  }

  if (!isBrowser) {
    return false;
  }

  ReactGA4.initialize(measurementId);
  initialized = true;
  return true;
};

export const trackPageView = (path?: string, title?: string) => {
  if (!canInitialize()) {
    return;
  }

  const effectivePath =
    path ??
    (isBrowser ? window.location.pathname + window.location.search : undefined);

  ReactGA4.send({
    hitType: "pageview",
    ...(effectivePath ? { page: effectivePath } : {}),
    ...(title ? { title } : {}),
  });
};

type EventParams = {
  category?: string;
  label?: string;
  value?: number;
  debugMode?: boolean;
};

export const trackEvent = (action: string, params?: EventParams) => {
  if (!canInitialize()) {
    return;
  }

  const { debugMode, ...rest } = params ?? {};
  const shouldSendDebugMode = Boolean(debugMode && allowDebugEvents);

  ReactGA4.event(action, {
    ...rest,
    ...(shouldSendDebugMode ? { debug_mode: true } : {}),
  });
};

export const ensureAnalytics = () => {
  canInitialize();
};
