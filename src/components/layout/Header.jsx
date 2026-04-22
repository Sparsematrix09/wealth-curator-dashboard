import React, { useState, useCallback } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useDebounce } from '../../hooks/useDebounce';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trackEvent } = useAnalytics();
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    trackEvent('search', 'click', 'header_search', value);
  }, [trackEvent]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl" aria-label="Wealth Curator Logo">W</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Wealth Curator</h1>
            <p className="text-xs text-gray-500">Personal Finance Dashboard</p>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">Search transactions</label>
            <input
              id="search-input"
              type="search"
              placeholder="Search transactions, merchants..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Search transactions and merchants"
            />
            <svg 
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            aria-label="Notifications"
            tabIndex={0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium">John Carter</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
            <img 
              src="https://ui-avatars.com/api/?name=John+Carter&background=0058be&color=fff" 
              alt="Profile avatar of John Carter"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;