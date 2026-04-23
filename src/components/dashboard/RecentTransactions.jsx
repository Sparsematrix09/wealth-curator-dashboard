import React, { useState, useMemo } from 'react';
import Card from '../common/Card';
import { useFetch } from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import LoadingSpinner from '../common/LoadingSpinner';

const RecentTransactions = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: transactions, loading, error } = useFetch('/api/transactions');

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    let filtered=[...transactions];
    
    if (debouncedSearch) {
      filtered=filtered.filter(t => 
        t.merchant.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
    if (filter!=='all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === filter.toLowerCase());
    }
    
    return filtered;
  }, [transactions, debouncedSearch, filter]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500" role="alert">Error loading transactions</div>;

  const categories=['all', ...new Set(transactions?.map(t => t.category.toLowerCase()) || [])];

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Recent Activity
        </h3>
        
        <div className="flex gap-2">
          <div className="relative">
            <label htmlFor="transaction-search" className="sr-only">Search transactions</label>
            <input
              id="transaction-search"
              type="text"
              placeholder="Search merchants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search transactions by merchant name"
            />
          </div>
          
          <div>
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
              id="category-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Filter transactions by category"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.map((transaction, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            role="row"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{transaction.date}</span>
                  <span>•</span>
                  <span className="capitalize">{transaction.category}</span>
                  <span>•</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    transaction.status==='cleared'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
            <p className={`text-sm font-semibold ${transaction.amount<0?'text-red-600':'text-green-600'}`}>
              {transaction.amount<0?'-':'+'}${Math.abs(transaction.amount).toLocaleString()}
            </p>
          </div>
        ))}
        
        {filteredTransactions.length===0 &&(
          <div className="text-center py-8 text-gray-500" role="status">
            No transactions found
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentTransactions;