// Google Analytics 4 Integration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    // Load GA4 script
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
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }
  console.log('[GA4] Page view:', path);
};

// Track custom events
export const trackEvent = (category, action, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  console.log('[GA4] Event:', { category, action, label, value });
};

// Track button clicks specifically
export const trackButtonClick = (buttonName, pageLocation) => {
  trackEvent('Button', 'click', `${buttonName}_${pageLocation}`);
};

// Track search queries
export const trackSearch = (searchTerm) => {
  trackEvent('Search', 'query', searchTerm);
};

// Track filter usage
export const trackFilter = (filterValue, filterType) => {
  trackEvent('Filter', 'apply', `${filterType}_${filterValue}`);
};