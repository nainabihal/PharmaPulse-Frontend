import { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsSection from "./components/NewSection";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./components/AnalyticsPage";

export default function DashboardApp () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic backend state
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Fetch initial market news and past runs on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch("http://localhost:8000/intelligence");
        if (res.ok) {
          const data = await res.json();
          if (data && !data.message) {
            setIntelligenceData(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial market news:", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = async (query) => {
    const cleanQuery = query.toLowerCase().trim();
    setSearchQuery(cleanQuery);
    setView('results');
    setSearchLoading(true);
    setSearchError(null);

    try {
      const res = await fetch(
        `http://localhost:8000/run/${encodeURIComponent(cleanQuery)}`,
        { method: "POST" }
      );
      if (!res.ok) {
        throw new Error(`Server returned error: ${res.status}`);
      }
      const data = await res.json();
      setIntelligenceData(data);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchError("Unable to load intelligence report. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleExpandNews = () => {
    setView('news');
  };

  const handleCollapseNews = () => {
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} setView={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto">
          <div className={`h-full ${view === 'dashboard' ? 'px-0' : 'p-8'}`} >
            
            {view === 'dashboard' && (
                <div className="h-full flex">
                  <div className="absolute inset-0 -z-20 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 2}s`,
                      }}
                    />
                  ))}
                </div>

                  <div className="h-full w-full flex flex-col justify-center gap-10">
                    <header className="relative w-full bg-background/80 backdrop-blur text-center overflow-hidden">
                    <div className="absolute w-full h-24 overflow-hidden">
                      <svg
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                      >
                        <path
                          d="
                            M0 50 
                            L80 50 
                            L100 30 
                            L120 70 
                            L140 50 
                            L220 50
                            L240 20 
                            L260 80 
                            L280 50
                            L360 50
                            L380 30
                            L400 70
                            L420 50
                            L1000 50
                          "
                          className="ecg-line"
                        />
                      </svg>
                    </div>

                      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-6 py-6 gap-3">
  <h1 className="
    relative flex items-center text-2xl font-extrabold tracking-tight
    rounded-full overflow-hidden
    border border-cyan-400/40
    bg-white/70 backdrop-blur
    shadow-[0_0_40px_rgba(34,211,238,0.15)]
  ">
    {/* Pharma */}
    <span className="px-5 py-2 text-slate-800">
      Pharma
    </span>

    {/* Pulse */}
    <span className="
      relative px-5 py-2
      text-white
      bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-400
      animate-pulseGlow
    ">
      Pulse

      {/* ECG flash */}
      <span className="
        absolute inset-0
        bg-white/20
        translate-x-[-100%]
        animate-scan
      " />
    </span>
  </h1>

  <p className="text-sm text-slate-500 max-w-md text-center">
    Real-time pharma insights & updates
  </p>
</div>

                      
                    </header>
                    

                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-2xl animate-breathe">
                        <SearchBar onSearch={handleSearch} loading={searchLoading} />
                      </div>
                    </div>
                  </div>

                  <div className="hidden w-64 lg:block lg:flex lg:justify-end">
                    <NewsSection 
                      isExpanded={false}
                      onExpand={handleExpandNews}
                      marketIntelligence={intelligenceData?.market_intelligence}
                    />
                  </div>
                </div>
            )}

            {view === 'results' && (
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AnalyticsPage 
                  searchQuery={searchQuery}
                  productIntelligence={intelligenceData?.productIntelligence || []}
                  finalExecutiveProductIntelligenceReport={intelligenceData?.finalExecutiveProductIntelligenceReport || []}
                  loading={searchLoading}
                  error={searchError}
                />
                {!(view === 'results') && (
                  <div
                  className="col-span-1 lg:hidden"
                  >
                    <NewsSection 
                      isExpanded={false}
                      onExpand={handleExpandNews}
                      marketIntelligence={intelligenceData?.market_intelligence}
                    />
                  </div>
                )}
                
              </div>
            )}
            
            {view === 'news' && (
              <div className="w-full">
                <NewsSection 
                  isExpanded={true}
                  onCollapse={handleCollapseNews}
                  marketIntelligence={intelligenceData?.market_intelligence}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};