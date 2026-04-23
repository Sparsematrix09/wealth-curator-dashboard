// generate dynamic insights based on portfolio data
export const generateDetailedInsights = () => {
  const techExposureIncrease = 14.2;
  const duplicateSubscriptions = 2;
  const subscriptionSavings = 160;
  const taxLossBenefit = 2100;
  
  return {
    critical: {
      id: 'rebalance_priority',
      type: 'rebalance',
      title: `Your technology exposure has increased by ${techExposureIncrease}% since last quarter`,
      description: `Our algorithms suggest shifting 4% of gains into emerging market debt and high-yield real estate to maintain your risk-adjusted profile.`,
      action: `Rebalancing portfolio: Reducing tech by 4%, adding to emerging markets and real estate.`
    },
    performance: {
      current: 1424902.18,
      change: 12.4,
      history: [1386400, 1392000, 1401000, 1412500, 1420000, 1424902]
    },
    cashFlow: [
      {
        id: 'surplus_opportunity',
        title: 'Surplus Opportunity',
        description: 'You spent 12% less on dining this month. Transfer $450 to your "Growth" bucket to stay ahead of your 2024 goal.',
        action: 'Moving $450 from Dining budget to Growth investment bucket.'
      }
    ],
    recurring: {
      id: 'subscription_audit',
      title: 'Overlapping Subscriptions Detected',
      description: `We detected ${duplicateSubscriptions} overlapping streaming subscriptions. Canceling duplicate would save you $${subscriptionSavings} annually.`,
      savings: subscriptionSavings,
      action: `Review and consolidate streaming subscriptions to save $${subscriptionSavings}/year.`
    },
    taxLoss: {
      id: 'tax_harvesting',
      title: 'Tax-Loss Harvesting Opportunity',
      description: '3 assets in your legacy portfolio are eligible for tax-loss harvesting.',
      benefit: taxLossBenefit,
      action: `Harvest tax losses on 3 eligible assets for $${taxLossBenefit} benefit.`
    },
    sentiment: {
      score: 74,
      status: 'Optimistic',
      indicators: [
        { name: 'Global Equities', value: 'Bullish', trend: 'up', percentage: 72, color: 'bg-green-500' },
        { name: 'Fixed Income', value: 'Neutral', trend: 'neutral', percentage: 50, color: 'bg-yellow-500' },
        { name: 'Volatility Index', value: 'Low', trend: 'down', percentage: 28, color: 'bg-green-500' }
      ]
    },
    allocation: [
      { name: 'Technology', percentage: 42, color: '#0058be', change: 14.2 },
      { name: 'Financials', percentage: 18, color: '#024700', change: 2.1 },
      { name: 'Healthcare', percentage: 15, color: '#105981', change: 1.5 },
      { name: 'Real Estate', percentage: 12, color: '#334155', change: 3.2 },
      { name: 'Other', percentage: 13, color: '#be123c', change: -1.8 }
    ]
  };
};

// simpler insights for dashboard
export const generateInsights = (portfolioData) => {
  return {
    title: 'Optimizing your portfolio for the upcoming Q3 market shift',
    description: 'Our AI analyzed your current allocation and identified 3 key rebalancing opportunities to increase yield by 2.4%.',
  };
};