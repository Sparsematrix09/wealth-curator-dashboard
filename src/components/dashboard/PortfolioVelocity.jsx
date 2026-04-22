import React from 'react';
import Card from '../common/Card';
import { useFetch } from '../../hooks/useFetch';

const PortfolioVelocity = () => {
  const { data } = useFetch('/api/portfolio');

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Portfolio Velocity
      </h3>
      <p className="text-2xl font-bold text-gray-900">
        ${data?.peakPerformance?.toLocaleString() || '142,850'}
      </p>
      <p className="text-xs text-gray-500 mt-1">Peak Performance (All Time)</p>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">vs S&P 500</span>
          <span className="text-sm font-semibold text-green-600">+2.4%</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioVelocity;