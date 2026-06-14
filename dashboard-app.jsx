import React, { useState } from 'react';
import { Search, Menu, X, ChevronLeft, TrendingUp, FileText, BarChart3, Newspaper } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockInsights = {
  title: "Key Insights",
  metrics: [
    { label: "Total Revenue", value: "$124.5K", change: "+12.3%" },
    { label: "Active Users", value: "8,432", change: "+5.7%" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.8%" }
  ]
};

const mockInfo = {
  title: "Quick Info",
  items: [
    { label: "Last Updated", value: "2 hours ago" },
    { label: "Data Quality", value: "98.5%" },
    { label: "Sources", value: "12 active" }
  ]
};

const mockChartData = {
  title: "Performance Overview",
  description: "Monthly trends and analytics",
  data: [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 68 },
    { month: "Apr", value: 85 },
    { month: "May", value: 92 },
    { month: "Jun", value: 88 }
  ]
};

const mockSnippets = [
  {
    id: 1,
    title: "Q4 Performance Report",
    description: "Quarterly results show strong growth across all segments",
    timestamp: "2 hours ago",
    tag: "Report"
  },
  {
    id: 2,
    title: "Customer Feedback Summary",
    description: "Net Promoter Score increased to 72, up from 68 last quarter",
    timestamp: "5 hours ago",
    tag: "Analysis"
  },
  {
    id: 3,
    title: "Market Trends Update",
    description: "Emerging opportunities in the APAC region identified",
    timestamp: "1 day ago",
    tag: "Insight"
  },
  {
    id: 4,
    title: "Tech Stack Review",
    description: "Recommendations for infrastructure optimization",
    timestamp: "2 days ago",
    tag: "Technical"
  }
];

const mockNews = [
  {
    id: 1,
    title: "Industry Report: AI Adoption Accelerates",
    source: "Tech Daily",
    timestamp: "1 hour ago",
    category: "Technology"
  },
  {
    id: 2,
    title: "Market Analysis: Q1 Projections",
    source: "Financial Times",
    timestamp: "3 hours ago",
    category: "Finance"
  },
  {
    id: 3,
    title: "New Regulations Impact SaaS Sector",
    source: "Business Wire",
    timestamp: "5 hours ago",
    category: "Regulatory"
  },
  {
    id: 4,
    title: "Customer Experience Trends 2026",
    source: "CX Magazine",
    timestamp: "8 hours ago",
    category: "Business"
  },
  {
    id: 5,
    title: "Cloud Infrastructure Innovations",
    source: "Cloud News",
    timestamp: "12 hours ago",
    category: "Technology"
  }
];

// ============================================================================
// COMPONENT: Sidebar
// ============================================================================

const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    { icon: <BarChart3 size={20} />, label: "Dashboard", active: true },
    { icon: <FileText size={20} />, label: "Reports", active: false },
    { icon: <TrendingUp size={20} />, label: "Analytics", active: false },
    { icon: <Newspaper size={20} />, label: "News", active: false }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <button 
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${item.active 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// ============================================================================
// COMPONENT: Header
// ============================================================================

const Header = ({ onMenuToggle }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 lg:px-8">
      <button 
        onClick={onMenuToggle}
        className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>
      <h2 className="text-lg font-semibold text-gray-900 ml-2 lg:ml-0">Search & Insights</h2>
    </header>
  );
};

// ============================================================================
// COMPONENT: SearchBar
// ============================================================================

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for insights, reports, or analytics..."
          className="w-full px-6 py-4 pr-14 text-base border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 transition-shadow shadow-sm hover:shadow-md"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 
                   text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

// ============================================================================
// COMPONENT: InsightsCard
// ============================================================================

const InsightsCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{data.title}</h3>
      <div className="space-y-4">
        {data.metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: InfoCard
// ============================================================================

const InfoCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: ChartsCard
// ============================================================================

const ChartsCard = ({ data }) => {
  const maxValue = Math.max(...data.data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{data.description}</p>
      </div>
      
      {/* Simple bar chart */}
      <div className="space-y-4">
        {data.data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full
                         flex items-center justify-end px-3 transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-xs font-semibold text-white">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: SnippetCard
// ============================================================================

const SnippetCard = ({ snippet }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm 
                  hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 flex-1">{snippet.title}</h4>
        <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full ml-2">
          {snippet.tag}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{snippet.description}</p>
      <span className="text-xs text-gray-400">{snippet.timestamp}</span>
    </div>
  );
};

// ============================================================================
// COMPONENT: NewsSection
// ============================================================================

const NewsSection = ({ isExpanded, onExpand, onCollapse, news }) => {
  if (isExpanded) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onCollapse}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">News Feeds</h3>
        </div>
        
        <div className="space-y-4">
          {news.map((item) => (
            <div 
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 
                       hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 flex-1 pr-2">
                  {item.title}
                </h4>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium">{item.source}</span>
                <span>•</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onExpand}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm 
               hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">News Section</h3>
        <Newspaper size={18} className="text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {news.slice(0, 3).map((item) => (
          <div key={item.id} className="pb-3 border-b border-gray-100 last:border-0">
            <h4 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">
              {item.title}
            </h4>
            <span className="text-xs text-gray-400">{item.timestamp}</span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-3 text-xs font-medium text-blue-600 hover:text-blue-700">
        View all news →
      </button>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const DashboardApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'results', 'news'
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('results');
  };

  const handleExpandNews = () => {
    setView('news');
  };

  const handleCollapseNews = () => {
    setView('results');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        {/* Content Area - Using CSS Grid for layout */}
        <main className="flex-1 overflow-auto">
          <div className="h-full p-4 lg:p-8">
            {/* 
              CSS Grid chosen for:
              1. Two-dimensional control (rows + columns)
              2. Explicit grid areas for complex layouts
              3. Better for dashboard-style layouts with defined regions
              4. Easier responsive transitions between layouts
            */}
            
            {/* HOME VIEW */}
            {view === 'home' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                {/* Main Content - Centered Search */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-2xl px-4">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                </div>

                {/* News Section - Compact */}
                <div className="lg:block hidden">
                  <NewsSection 
                    isExpanded={false}
                    onExpand={handleExpandNews}
                    news={mockNews}
                  />
                </div>
              </div>
            )}

            {/* RESULTS VIEW */}
            {view === 'results' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                {/* Main Content - Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
                  {/* Top Row - Insights & Info */}
                  <InsightsCard data={mockInsights} />
                  <InfoCard data={mockInfo} />
                  
                  {/* Bottom Row - Charts (spans full width) & Snippets */}
                  <div className="md:col-span-1">
                    <ChartsCard data={mockChartData} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 px-1">Snippets</h3>
                    {mockSnippets.map((snippet) => (
                      <SnippetCard key={snippet.id} snippet={snippet} />
                    ))}
                  </div>
                </div>

                {/* News Section - Compact */}
                <div className="lg:block hidden">
                  <NewsSection 
                    isExpanded={false}
                    onExpand={handleExpandNews}
                    news={mockNews}
                  />
                </div>
              </div>
            )}

            {/* NEWS EXPANDED VIEW */}
            {view === 'news' && (
              <div className="max-w-4xl mx-auto">
                <NewsSection 
                  isExpanded={true}
                  onCollapse={handleCollapseNews}
                  news={mockNews}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardApp;
