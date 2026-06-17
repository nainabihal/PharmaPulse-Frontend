import { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsSection from "./components/NewSection";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./components/AnalyticsPage";
import { X, Globe, Save } from "lucide-react";

export default function DashboardApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic backend configuration states
  const [backendUrl, setBackendUrl] = useState(() => {
    return localStorage.getItem("pharma_pulse_backend_url") || import.meta.env.VITE_API_URL || "http://localhost:8000";
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempBackendUrl, setTempBackendUrl] = useState(backendUrl);

  // Dynamic backend state
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Fetch initial market news and past runs on mount / backendUrl change
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(`${backendUrl}/intelligence`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
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
  }, [backendUrl]);

  const handleSearch = async (query) => {
    const cleanQuery = query.toLowerCase().trim();
    setSearchQuery(cleanQuery);
    setView('results');
    setSearchLoading(true);
    setSearchError(null);

    try {
      const res = await fetch(
        `${backendUrl}/run/${encodeURIComponent(cleanQuery)}`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
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
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          onSettingsOpen={() => {
            setTempBackendUrl(backendUrl);
            setIsSettingsOpen(true);
          }}
        />

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

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in animate-fade-in-duration">
          <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform scale-100 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
                  <Globe size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Connection Settings</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Backend API URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tempBackendUrl}
                    onChange={(e) => setTempBackendUrl(e.target.value)}
                    placeholder="http://localhost:8000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-2xl text-slate-700 text-sm outline-none transition-all pr-10 font-mono"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Globe size={16} />
                  </div>
                </div>
              </div>

              {/* Helper guide */}
              <div className="p-4 bg-cyan-50/40 border border-cyan-100/50 rounded-2xl space-y-2 text-xs text-cyan-800 leading-relaxed">
                <span className="font-bold block text-cyan-900">How to use with ngrok / mobile:</span>
                <ol className="list-decimal list-inside space-y-1 text-cyan-700">
                  <li>Run your backend server: <code className="bg-cyan-100/70 px-1 rounded font-mono">fastapi dev api.py</code></li>
                  <li>Expose it: <code className="bg-cyan-100/70 px-1 rounded font-mono">ngrok http 8000</code></li>
                  <li>Copy the public <code className="font-semibold">https://...ngrok-free.app</code> URL</li>
                  <li>Paste it in the box above and save!</li>
                </ol>
                <p className="mt-2 text-[10px] text-cyan-600">
                  * All requests are automatically configured to bypass the ngrok warning screen.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  let formattedUrl = tempBackendUrl.trim();
                  // Remove trailing slash if present
                  if (formattedUrl.endsWith("/")) {
                    formattedUrl = formattedUrl.slice(0, -1);
                  }
                  localStorage.setItem("pharma_pulse_backend_url", formattedUrl);
                  setBackendUrl(formattedUrl);
                  setIsSettingsOpen(false);
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 active:scale-95 shadow-md shadow-cyan-500/10 rounded-xl transition-all cursor-pointer"
              >
                <Save size={16} />
                Save Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};