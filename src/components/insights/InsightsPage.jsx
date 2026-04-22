import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAnalytics } from '../../hooks/useAnalytics';
import { generateDetailedInsights } from '../../services/insightsGenerator';

const InsightsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const generatedInsights = generateDetailedInsights();
      setInsights(generatedInsights);
      setLoading(false);
      trackEvent('page_view', 'insights', 'insights_page', 'Insights Page');
    } catch (error) {
      console.error('Error generating insights:', error);
      setLoading(false);
    }
  }, [trackEvent]);

  const handleApplyInsight = (insight) => {
    trackEvent('apply', 'insight', insight.id, 'Apply Insight');
    console.log('Applied insight:', insight.title);
  };

  const handleDismissInsight = (insightId) => {
    trackEvent('dismiss', 'insight', insightId, 'Dismiss Insight');
    console.log('Dismissed insight:', insightId);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Failed to load insights. Please try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Portfolio Insights</h1>
            <p className="text-sm text-gray-500 mt-1">
              Curated financial perspective based on real-time analysis of your portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Rest of your insights content remains the same */}
      {/* Active Signal - Most Critical Insight */}
      {insights.critical && (
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  ACTIVE SIGNAL: {insights.critical.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{insights.critical.title}</h3>
              <p className="text-gray-700 mb-4">{insights.critical.description}</p>
              <div className="flex space-x-3">
                <Button onClick={() => handleApplyInsight(insights.critical)} variant="primary">
                  Review Strategy
                </Button>
                <Button onClick={() => handleDismissInsight(insights.critical.id)} variant="secondary">
                  Dismiss
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <p className="text-xs text-gray-500">Priority Score</p>
                <p className="text-2xl font-bold text-orange-600">94<span className="text-sm">/100</span></p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Two Column Layout for Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Performance with Working Chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Portfolio Performance
            </h3>
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">${insights.performance.current.toLocaleString()}</p>
                <p className={`text-sm font-semibold mt-1 ${insights.performance.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {insights.performance.change >= 0 ? '+' : ''}{insights.performance.change}% from last month
                </p>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="mt-6">
              <div className="flex items-end h-48 gap-2">
                {insights.performance.history.map((value, idx) => {
                  const maxValue = Math.max(...insights.performance.history);
                  const height = (value / maxValue) * 100;
                  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary rounded-t transition-all duration-500 hover:bg-blue-700 cursor-pointer"
                        style={{ height: `${height}%`, minHeight: '4px' }}
                      >
                        <div className="opacity-0 hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-6 whitespace-nowrap">
                          ${value.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2 font-medium">
                        {months[idx]}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-xs text-gray-600">Portfolio Value</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Cash Flow Intelligence */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Cash Flow Intelligence
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Automated suggestions based on your spending patterns
            </p>
            <div className="space-y-4">
              {insights.cashFlow?.map((item, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/30 rounded-r">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <button 
                    onClick={() => handleApplyInsight(item)}
                    className="text-xs text-primary hover:text-primary-dark mt-2 font-medium"
                  >
                    Apply Suggestion →
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recurring Audit & Tax Harvesting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h4 className="text-sm font-semibold text-gray-900">Recurring Audit</h4>
              </div>
              <p className="text-gray-700 mb-3">{insights.recurring?.description}</p>
              <p className="text-sm font-semibold text-green-600">Save ${insights.recurring?.savings}/annually</p>
              <button 
                onClick={() => handleApplyInsight(insights.recurring)}
                className="text-xs text-primary mt-3"
              >
                Review Subscriptions →
              </button>
            </Card>

            <Card>
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-sm font-semibold text-gray-900">Tax-Loss Harvesting</h4>
              </div>
              <p className="text-gray-700 mb-3">{insights.taxLoss?.description}</p>
              <p className="text-sm font-semibold text-green-600">Potential benefit: ${insights.taxLoss?.benefit}</p>
              <button 
                onClick={() => handleApplyInsight(insights.taxLoss)}
                className="text-xs text-primary mt-3"
              >
                View Eligible Assets →
              </button>
            </Card>
          </div>
        </div>

        {/* Right Column - Market Sentiment & Allocation */}
        <div className="space-y-6">
          {/* Market Sentiment */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Market Sentiment
            </h3>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-900">{insights.sentiment?.score}/100</p>
              <p className="text-sm font-semibold text-green-600">{insights.sentiment?.status}</p>
            </div>
            <div className="space-y-3">
              {insights.sentiment?.indicators?.map((ind, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{ind.name}</span>
                    <span className={`font-medium ${ind.trend === 'up' ? 'text-green-600' : ind.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                      {ind.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${ind.color}`} 
                      style={{ width: `${ind.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sector Allocation */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Sector Allocation
            </h3>
            <div className="space-y-3">
              {insights.allocation?.map((sector, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{sector.name}</span>
                    <span className="font-medium text-gray-900">{sector.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${sector.percentage}%`,
                        backgroundColor: sector.color 
                      }}
                    ></div>
                  </div>
                  {sector.change && (
                    <p className={`text-xs mt-1 ${sector.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {sector.change > 0 ? '+' : ''}{sector.change}% from last quarter
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={handleGoBack}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                ← Back to Dashboard
              </button>
              <button 
                onClick={() => console.log('Downloading portfolio report...')}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                📄 Download Full Report
              </button>
              <button 
                onClick={() => console.log('Scheduling advisor consultation...')}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                👨‍💼 Schedule Advisor Call
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;