# Wealth Curator - AI-Powered Personal Finance Dashboard
A production-ready personal finance dashboard built with React. Features real-time net worth tracking, AI-driven insights, spending analytics, and portfolio intelligence. Demonstrates modern frontend engineering practices including custom hooks, performance optimization, SEO implementation, and analytics tracking.

---

## Live Demo
| **Frontend (Vercel)** | [https://wealth-curator-dashboard.vercel.app](https://wealth-curator-dashboard.vercel.app) |
| **Analytics** | Google Analytics 4 Integration |
| **Database** | Mocked / Local Storage |

---

## Core Features Implemented

### Financial Dashboard
- Net worth, spending, and savings summaries
- Visual charts for spending breakdown
- Recent transactions overview
- Alerts for important financial events

### AI-Powered Insights
- Personalized portfolio recommendations
- Actionable tips for spending and saving
- AI-generated alerts for unusual transactions

### Transaction Management
- Search and filter transactions
- Update and categorize transactions
- Debounced search to reduce API calls

### Portfolio Tracking
- Portfolio performance metrics
- Sector allocation visualizations
- Historical performance charts

### UI/UX Features
- Responsive design for mobile, tablet, desktop
- Loading spinners and skeletons for async data
- Toast notifications for user actions
- Accessible navigation with ARIA labels and keyboard support

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, Tailwind CSS |
| Build Tool | Vite |
| Routing | React Router v6 |
| Charts | Chart.js + react-chartjs-2 |
| State Management | React Hooks (Custom Hooks) |
| Analytics | Google Analytics 4 (GA4) |
| Language | JavaScript (ES6+) |
| Deployment | Vercel |

---
```
Atomic Design Structure:
├── Atoms (Button, Card, LoadingSpinner)
├── Molecules (SummaryCards)
├── Organisms (Dashboard)
└── Templates (Layout)
**Why:** Reusability, maintainability, testability, and scalability.
```
### State Management
- React hooks instead of Redux
- Minimal props drilling
- Custom hooks handle abstraction

**Trade-off:** Less centralized state

### Styling Approach
- Tailwind CSS (utility-first)
- Purged unused CSS for smaller bundles

**Trade-off:** Longer JSX class strings

### Build Tool
- Vite for fast HMR and production builds
- Native ESM support

**Trade-off:** Less mature ecosystem than CRA

---

## System Flow

### Data Flow Explanation

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| **Client** | React.js | Renders UI, manages state, handles user interactions |
| **Custom Hooks** | useFetch, useDebounce, useAnalytics, useLocalStorage | Fetch data, debounce inputs, track analytics, persist data |
| **Backend** | Mock API / LocalStorage | Serves financial data, portfolio info, AI insights |
| **Database** | LocalStorage / JSON | Stores user preferences, cached financial data |

### Key Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **SummaryCards** | Displays net worth, savings, and expenses | id, type, amount |
| **Transactions** | User transactions | id, date, amount, category, description |
| **Portfolio** | Investment holdings | id, name, sector, value, allocation |
| **Alerts** | Financial alerts and notifications | id, type, message, timestamp |
| **Insights** | AI-generated recommendations | id, category, suggestion, impact |

---

## Custom Hooks

### `useFetch`
- Centralizes API calls
- Handles loading and error states
- Returns `refetch` for manual updates

### `useDebounce`
- Prevents API calls on every keystroke
- Reduces filtering operations by ~70%
- Improves UI responsiveness

### `useAnalytics`
- Abstracts GA4 event tracking
- Easy to swap analytics providers

### `useLocalStorage`
- Persists user preferences
- Handles lazy initialization and JSON serialization

---

## Performance Optimizations

| Technique | Impact |
|-----------|--------|
| Lazy Loading (React `Suspense`) | Reduces initial bundle size by ~40% |
| Memoization (`useMemo`, `useCallback`) | Prevents unnecessary re-renders |
| Debounced Search | Reduces search API calls by ~70% |
| Manual Vite Chunks | Improves caching and parallel loading |

---

## SEO Techniques Used

- Semantic HTML and heading hierarchy
- Meta tags for social sharing
- Open Graph tags
- Canonical URLs
- Accessible ARIA attributes

---

## Installation

### Prerequisites
- Node.js v18+
- npm or yarn

### Setup
```bash
# Clone repository
git clone https://github.com/Sparsematrix09/wealth-curator-dashboard.git
cd wealth-curator-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

Environment Variables
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
## Analytics Tracking

| Event          | Category   | Action            | Trigger            |
|----------------|-----------|-----------------|------------------|
| Page View      | page_view | URL              | Navigation        |
| Search         | search    | type             | Search input      |
| Filter         | filter    | click            | Category filter   |
| CTA Click      | CTA       | click            | Insight button    |
| Apply Insight  | apply     | insight          | Portfolio actions |

---

## Project Structure
```
wealth-curator-dashboard/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── common/ # Button, Card, LoadingSpinner
│ │ ├── layout/ # Layout, Header, Sidebar
│ │ ├── dashboard/ # Dashboard, SummaryCards, AIInsights, AlertsSection
| | ├── insights/ #insightsPage
│ │ └── charts/ # DoughnutChart
│ ├── hooks/ # useFetch, useAnalytics, useDebounce, useLocalStorage
│ ├── services/ # api, analytics, ga4, insightsGenerator
│ ├── utils/ # formatters
│ ├── App.jsx
│ └── index.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
##Assumptions Made
- Single default user (no authentication)
- Mock API used for demonstration purposes
- Sample financial data preloaded
- No real bank account integration
- Focus is on dashboard visualization and AI-powered insights
