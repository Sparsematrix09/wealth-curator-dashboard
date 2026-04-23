import React, { lazy, Suspense } from 'react';
import SummaryCards from './SummaryCards';
import AIInsights from './AIInsights';
import AlertsSection from './AlertsSection';
import SpendingBreakdown from './SpendingBreakdown';
import RecentTransactions from './RecentTransactions';
import LoadingSpinner from '../common/LoadingSpinner';

const PortfolioVelocity=lazy(() => import('./PortfolioVelocity'));

const Dashboard=()=>{
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back, John. Here's your financial overview.</p>
      </div>

      <section aria-labelledby="summary-heading">
        <h3 id="summary-heading" className="sr-only">Financial Summary</h3>
        <SummaryCards />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section aria-labelledby="ai-insights-heading">
            <h4 id="ai-insights-heading" className="sr-only">AI Insights</h4>
            <AIInsights />
          </section>
          
          <section aria-labelledby="transactions-heading">
            <h5 id="transactions-heading" className="sr-only">Recent Transactions</h5>
            <RecentTransactions />
          </section>
        </div>

        <div className="space-y-6">
          <section aria-labelledby="spending-heading">
            <h6 id="spending-heading" className="sr-only">Spending Breakdown</h6>
            <SpendingBreakdown />
          </section>
          
          <section aria-labelledby="alerts-heading">
            <h6 id="alerts-heading" className="sr-only">Active Alerts</h6>
            <AlertsSection />
          </section>

          <Suspense fallback={<LoadingSpinner />}>
            <section aria-labelledby="portfolio-heading">
              <h6 id="portfolio-heading" className="sr-only">Portfolio Velocity</h6>
              <PortfolioVelocity />
            </section>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;