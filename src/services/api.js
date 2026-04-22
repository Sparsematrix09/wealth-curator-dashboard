const mockData = {
  summary: {
    netWorth: 1248500,
    monthlySpending: 4280,
    totalSavings: 245000,
  },
  alerts: [
    {
      type: 'subscription',
      title: 'Subscription Spike',
      message: '3 new recurring charges detected from "Cloud SaaS" in the last 48h.',
      time: '2 hours ago',
    },
    {
      type: 'investment',
      title: 'Emergency Fund Cap',
      message: 'Your "Rarity Day" fund has reached its target of $20k. Redirecting flows?',
      time: '1 day ago',
    },
    {
      type: 'investment',
      title: 'Dividend Reinvestment',
      message: 'AAPL and MSFT paid dividends today. Automatic reinvestment pending.',
      time: '2 days ago',
    },
  ],
  spending: [
    { category: 'Housing & Utilities', percentage: 42 },
    { category: 'Dining & Leisure', percentage: 18 },
    { category: 'Investments', percentage: 25 },
    { category: 'Transportation', percentage: 15 },
  ],
  transactions: [
    {
      merchant: 'Apple Store Soho',
      date: 'Oct 24, 2023',
      category: 'Technology',
      status: 'cleared',
      amount: -1299.00,
    },
    {
      merchant: 'Blue Hill Farm',
      date: 'Oct 23, 2023',
      category: 'Lifestyle',
      status: 'cleared',
      amount: -485.20,
    },
    {
      merchant: 'ConEd Utility Bill',
      date: 'Oct 22, 2023',
      category: 'Utilities',
      status: 'pending',
      amount: -214.10,
    },
    {
      merchant: 'Goldman Sachs Dividend',
      date: 'Oct 21, 2023',
      category: 'Investment',
      status: 'cleared',
      amount: 240.50,
    },
  ],
  portfolio: {
    peakPerformance: 142850,
  },
};

export const apiClient = {
  get: async (url) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/api/summary') return mockData.summary;
    if (url === '/api/alerts') return mockData.alerts;
    if (url === '/api/spending') return mockData.spending;
    if (url === '/api/transactions') return mockData.transactions;
    if (url === '/api/portfolio') return mockData.portfolio;
    
    throw new Error('Endpoint not found');
  },
  
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('POST request to:', url, data);
    return { success: true };
  },
};