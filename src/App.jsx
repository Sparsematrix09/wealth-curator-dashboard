import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AnalyticsProvider } from './services/analytics';
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const InsightsPage = lazy(() => import('./components/insights/InsightsPage'));

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
                <Route path="/accounts" element={<div className="p-6 text-center text-gray-500">Accounts Page</div>} />
                <Route path="/transactions" element={<div className="p-6 text-center text-gray-500">Transactions Page</div>} />
                <Route path="/budgets" element={<div className="p-6 text-center text-gray-500">Budgets Page</div>} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}
export default App;