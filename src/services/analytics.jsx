import React, { createContext, useEffect } from 'react';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const initGA4 = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    if (!document.querySelector('script[src*="googletagmanager"]')) {
      // load GA4 script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
      
      console.log('GA4 initialized with ID:', GA_MEASUREMENT_ID);
    }
  } else {
    console.log('GA4 not initialized - no valid measurement ID found');
    console.log('Current ID:', GA_MEASUREMENT_ID);
  }
};

initGA4();

// simple working analytics with localstorage
const trackEventLocal = (action, category, label, value) => {
  console.log('[Analytics]', { action, category, label, value });
  
  try {
    const existingEvents = localStorage.getItem('analytics_events');
    const events = existingEvents ? JSON.parse(existingEvents) : [];
    
    events.push({
      action,
      category,
      label,
      value: value || null,
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    });
    
    const trimmedEvents = events.slice(-100);
    localStorage.setItem('analytics_events', JSON.stringify(trimmedEvents));
    
    console.log(`✅ Stored event - Total: ${events.length}`);
  } catch (error) {
    console.error('Error storing event:', error);
  }
  
  // send to GA4 if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log('Sent to GA4');
  } else {
    console.log('GA4 not available - event not sent to google');
  }
};

const trackPageViewLocal = (pagePath) => {
  console.log('[Analytics Page View]', pagePath);
  
  // store in localstorage
  try {
    const existingViews = localStorage.getItem('analytics_page_views');
    const views = existingViews ? JSON.parse(existingViews) : [];
    
    views.push({
      path: pagePath,
      timestamp: new Date().toISOString()
    });
    
    const trimmedViews = views.slice(-50);
    localStorage.setItem('analytics_page_views', JSON.stringify(trimmedViews));
    
    console.log(`Stored page view - Total: ${views.length}`);
  } catch (error) {
    console.error('Error storing page view:', error);
  }
  
  // Send to GA4 if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
    });
    console.log('Page view sent to GA4');
  } else {
    console.log('GA4 not available - page view not sent to Google');
  }
};

export const AnalyticsContext = createContext({
  trackEvent: trackEventLocal,
  trackPageView: trackPageViewLocal,
});

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    console.log('AnalyticsProvider mounted');
    console.log('GA4 Status:', typeof window.gtag==='function'? 'Available' : 'Not available');
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

// helpers 
export const getAnalyticsData = () => {
  return {
    events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
    pageViews: JSON.parse(localStorage.getItem('analytics_page_views') || '[]')
  };
};

export const clearAnalyticsData = () => {
  localStorage.removeItem('analytics_events');
  localStorage.removeItem('analytics_page_views');
  console.log('analytics data cleared');
};