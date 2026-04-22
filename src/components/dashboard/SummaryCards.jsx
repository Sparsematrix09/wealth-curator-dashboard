import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const SummaryCards = () => {
  const { data: summaryData, loading, error } = useFetch('/api/summary');

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500" role="alert">Error loading summary data</div>;

  const cards = [
    {
      title: 'Total Net Worth',
      value: summaryData?.netWorth || 1248500,
      change: '+12.4%',
      changeType: 'positive',
      prefix: '$',
    },
    {
      title: 'Monthly Spending',
      value: summaryData?.monthlySpending || 4280,
      change: '+2.1%',
      changeType: 'warning',
      prefix: '$',
    },
    {
      title: 'Total Savings',
      value: summaryData?.totalSavings || 245000,
      change: 'On track for Q4 goal',
      changeType: 'neutral',
      prefix: '$',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {card.prefix}{card.value.toLocaleString()}
            </p>
            <p className={`text-sm mt-2 ${
              card.changeType === 'positive' ? 'text-green-600' :
              card.changeType === 'warning' ? 'text-orange-600' :
              'text-gray-500'
            }`}>
              {card.change}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;