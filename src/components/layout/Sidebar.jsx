import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAnalytics } from '../../hooks/useAnalytics';

const Sidebar = () => {
  const { trackEvent } = useAnalytics();

  const navItems = [
    { path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { path: '/accounts', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', label: 'Accounts' },
    { path: '/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', label: 'Transactions' },
    { path: '/budgets', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Budgets' },
    { path: '/insights', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', label: 'Insights' },
  ];

  const handleNavClick = (label) => {
    trackEvent('navigation', 'click', `sidebar_${label.toLowerCase()}`);
  };

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen" aria-label="Main navigation">
      <div className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => handleNavClick(item.label)}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:bg-gray-100 ${
                isActive
                  ? 'text-primary bg-blue-50 border-r-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
            aria-current={({ isActive }) => isActive ? 'page' : undefined}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;