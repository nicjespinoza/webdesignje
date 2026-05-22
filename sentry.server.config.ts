import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  environment: process.env.NODE_ENV,
  
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
  
  enabled: process.env.NODE_ENV === 'production',
  
  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Sentry Server] Event captured:', event);
      return null;
    }
    return event;
  },
});
