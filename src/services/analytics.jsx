import React, { createContext, useEffect } from 'react';
import { initGA, trackPageView, trackEvent as gaTrackEvent } from './ga4';

// Initialize GA4 when app loads
initGA();

const trackEventLocal = (action, category, label, value) => {
  // Send to GA4
  gaTrackEvent(category, action, label, value);
  
  // Also log for debugging
  console.log('[Analytics]', { action, category, label, value });
};

const trackPageViewLocal = (pagePath) => {
  // Send to GA4
  trackPageView(pagePath);
  
  console.log('[Analytics Page View]', pagePath);
};

export const AnalyticsContext = createContext({
  trackEvent: trackEventLocal,
  trackPageView: trackPageViewLocal,
});

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Track initial page view
    trackPageViewLocal(window.location.pathname);
  }, []);

  return (
    <AnalyticsContext.Provider value={{ 
      trackEvent: trackEventLocal, 
      trackPageView: trackPageViewLocal 
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};