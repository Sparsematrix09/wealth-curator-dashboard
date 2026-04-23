import React from 'react';
import Card from '../common/Card';
import { useFetch } from '../../hooks/useFetch';
import LoadingSpinner from '../common/LoadingSpinner';

const AlertsSection = () =>{
  const{ data: alerts, loading, error } = useFetch('/api/alerts');

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-sm" role="alert">Unable to load alerts</div>;

  const getAlertIcon = (type)=>{
    switch(type) {
      case 'subscription':
        return (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Active Alerts
        </h3>
        <span className="text-xs text-gray-500" aria-label={`${alerts?.length || 0} new alerts`}>
          {alerts?.length || 0} new
        </span>
      </div>
      
      <div className="space-y-4">
        {alerts?.map((alert, index)=>(
          <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.title}</p>
              <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsSection;