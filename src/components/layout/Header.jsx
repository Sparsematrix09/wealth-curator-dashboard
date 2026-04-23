import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
          >
            <span className="text-white font-bold text-xl" aria-label="Wealth Curator Logo">W</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
              Wealth Curator
            </h1>
            <p className="text-xs text-gray-500">Personal Finance Dashboard</p>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-4">
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