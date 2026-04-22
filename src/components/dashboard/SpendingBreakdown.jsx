import React, { useMemo } from 'react';
import Card from '../common/Card';
import { useFetch } from '../../hooks/useFetch';
import { useAnalytics } from '../../hooks/useAnalytics';
import DoughnutChart from '../charts/DoughnutChart';
import LoadingSpinner from '../common/LoadingSpinner';

const SpendingBreakdown = () => {
  const { data: spendingData, loading, error } = useFetch('/api/spending');
  const { trackEvent } = useAnalytics();

  const chartData = useMemo(() => {
    if (!spendingData) return null;
    return {
      labels: spendingData.map(item => item.category),
      datasets: [{
        data: spendingData.map(item => item.percentage),
        backgroundColor: ['#0058be', '#024700', '#105981', '#334155'],
        borderWidth: 0,
      }]
    };
  }, [spendingData]);

  const handleViewAll = () => {
    trackEvent('click', 'Navigation', 'view_all_spending', 'Spending Breakdown');
    // Just log the data instead of showing alert
    console.log('Detailed spending breakdown:', spendingData);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-sm" role="alert">Unable to load spending data</div>;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Spending Composition
        </h3>
        <button 
          onClick={handleViewAll}
          className="text-xs text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
          aria-label="View all spending categories"
        >
          View All →
        </button>
      </div>
      
      {chartData && <DoughnutChart data={chartData} />}
      
      <div className="mt-4 space-y-2">
        {spendingData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: chartData?.datasets[0].backgroundColor[index] }}
                aria-hidden="true"
              ></div>
              <span className="text-gray-600">{item.category}</span>
            </div>
            <span className="font-medium text-gray-900">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingBreakdown;