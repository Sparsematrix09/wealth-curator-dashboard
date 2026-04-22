import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAnalytics } from '../../hooks/useAnalytics';

const AIInsights = () => {
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();

  const handleExecuteStrategy = useCallback(() => {
    trackEvent('click', 'CTA', 'execute_strategy', 'AI Insights');
    // Navigate without state for better back button support
    navigate('/insights');
  }, [trackEvent, navigate]);

  const handleReviewAudit = useCallback(() => {
    trackEvent('click', 'CTA', 'review_audit', 'AI Insights');
    // Navigate without state for better back button support
    navigate('/insights');
  }, [trackEvent, navigate]);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-3">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            AI STRATEGY INSIGHT
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Optimizing your portfolio for the upcoming Q3 market shift
        </h3>
        
        <p className="text-gray-600 mb-4">
          Our AI analyzed your current allocation and identified 3 key rebalancing opportunities to increase yield by 2.4%.
        </p>
        
        <div className="flex space-x-3">
          <Button onClick={handleExecuteStrategy} variant="primary">
            Execute Strategy
          </Button>
          <Button onClick={handleReviewAudit} variant="secondary">
            Review Audit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIInsights;