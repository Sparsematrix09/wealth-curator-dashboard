import { useContext } from 'react';
import { AnalyticsContext } from '../services/analytics';

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return {
    trackEvent: (action, category, label, value) => {
      context.trackEvent(action, category, label, value);
    },
    trackPageView: (pageName) => {
      context.trackPageView(pageName);
    },
  };
};