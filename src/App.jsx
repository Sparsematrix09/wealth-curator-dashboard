import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AnalyticsProvider } from './services/analytics';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const InsightsPage = lazy(() => import('./components/insights/InsightsPage'));

// Simple placeholder component to avoid inline JSX
const PlaceholderPage = ({ title }) => (
  <div className="p-6 text-center">
    <div className="bg-white rounded-xl shadow-sm p-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500">
        This page is intentionally left blank.
      </p>
      <p className="text-gray-400 text-sm mt-4">
        The main focus of this project is the Dashboard and AI-powered insights.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AnalyticsProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/accounts" element={<PlaceholderPage title="Accounts" />} />
                <Route path="/transactions" element={<PlaceholderPage title="Transactions" />} />
                <Route path="/budgets" element={<PlaceholderPage title="Budgets" />} />
                {/* Catch-all route */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}

export default App;
