import React, { createContext, useEffect } from 'react';

// Global variable to track events (since hooks can't be used outside components)
let analyticsEvents = [];
let pageViews = [];

// Function to save to localStorage (using the same pattern as useLocalStorage)
const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

// Initialize from localStorage
analyticsEvents = loadFromLocalStorage('analytics_events', []);
pageViews = loadFromLocalStorage('analytics_page_views', []);

// Send to GA4 (if available)
const sendToGA4 = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Store in localStorage
const storeInLocalStorage = (action, category, label, value) => {
  analyticsEvents.push({
    action,
    category,
    label,
    value,
    timestamp: new Date().toISOString(),
    url: window.location.pathname
  });
  
  // Keep only last 100 events
  if (analyticsEvents.length > 100) {
    analyticsEvents = analyticsEvents.slice(-100);
  }
  
  saveToLocalStorage('analytics_events', analyticsEvents);
};

const trackEventLocal = (action, category, label, value) => {
  // Send to GA4
  sendToGA4(action, category, label, value);
  
  // Store in localStorage
  storeInLocalStorage(action, category, label, value);
  
  // Log to console
  console.log('[Analytics]', { action, category, label, value });
};

const trackPageViewLocal = (pagePath) => {
  // Send to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
    });
  }
  
  // Store in localStorage
  pageViews.push({
    path: pagePath,
    timestamp: new Date().toISOString()
  });
  
  if (pageViews.length > 50) {
    pageViews = pageViews.slice(-50);
  }
  
  saveToLocalStorage('analytics_page_views', pageViews);
  
  console.log('[Analytics Page View]', pagePath);
};

export const AnalyticsContext = createContext({
  trackEvent: trackEventLocal,
  trackPageView: trackPageViewLocal,
});

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
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

// Helper functions for debugging
export const getAnalyticsData = () => {
  return {
    events: loadFromLocalStorage('analytics_events', []),
    pageViews: loadFromLocalStorage('analytics_page_views', [])
  };
};

export const clearAnalyticsData = () => {
  localStorage.removeItem('analytics_events');
  localStorage.removeItem('analytics_page_views');
  analyticsEvents = [];
  pageViews = [];
  console.log('Analytics data cleared');
};

// Export the hook for use in components
export { useLocalStorage } from '../hooks/useLocalStorage';