import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://bb4c1914b9804472aa1bac0b36f4baf1@o534444.ingest.sentry.io/5656691",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

Sentry.captureMessage('Hello, world!');