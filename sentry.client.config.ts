import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  environment: process.env.NODE_ENV,
  
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  enabled: process.env.NODE_ENV === 'production',
  
  replaysOnErrorSampleRate: 1.0,
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  ignoreErrors: [
    'NetworkError',
    'Failed to fetch',
  ],
  
  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Sentry] Event captured:', event);
      return null;
    }
    return event;
  },
});
