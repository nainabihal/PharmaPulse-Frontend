import { ChevronLeft, Newspaper, TrendingUp, AlertTriangle, Target, Activity, ArrowRight } from "lucide-react";
import { market_intelligence as mockMarketIntelligence } from "../utils/mock-data";

export default function NewsSection ({ isExpanded, onExpand, onCollapse, marketIntelligence }) {
  const data = marketIntelligence || mockMarketIntelligence;
  
  const scout_output = data?.scout_output || { events: [] };
  const signal_analysis = data?.signal_analysis || { signals: [] };
  const strategic_insights = data?.strategic_insights || { opportunity_areas: [], recommended_moves: [] };
  const market_supervisor_summary = data?.market_supervisor_summary || { immediate_actions: [], risk_index: 0, executive_summary: "" };
  
  const news = scout_output?.events || [];

  if (isExpanded) {
    return (
      <div className="bg-slate-50 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-10 px-6 py-4 flex items-center gap-4 shadow-sm">
          <button
            onClick={onCollapse}
            className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200 text-slate-500 hover:text-slate-800 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Market Intelligence Hub
              <span className="relative flex h-2.5 w-2.5 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="px-2 py-0.5 rounded-full border-2 border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide">
                Live Feed
              </span>
            </h2>
            <p className="text-sm text-slate-500">Real-time market signals and strategic supervision</p>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeInUp">
            
            {/* Market Trend Hero Banner */}
            <div 
                className="relative overflow-hidden rounded-2xl border border-cyan-950/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/40 group animate-fadeInUp"
                style={{ animationDelay: '0.1s' }}
            >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-120"></div>
                <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
                
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md text-cyan-400 border border-white/10 shadow-inner flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/15">
                            <TrendingUp size={24} className="animate-pulseSlow" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/25 px-2.5 py-1 rounded-full border border-cyan-400/25">
                                Current Market Trend
                            </span>
                            <p className="text-base font-semibold text-slate-100 leading-relaxed mt-2 pr-4 transition-colors duration-300 group-hover:text-white">
                                {strategic_insights?.market_trend || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp"
                style={{ animationDelay: '0.2s' }}
            >
                <MetricCard 
                    label="Threat Level" 
                    value={strategic_insights?.threat_level || "N/A"} 
                    icon={<AlertTriangle size={18} />}
                    color={strategic_insights?.threat_level === 'High' ? 'red' : 'yellow'}
                />
                <MetricCard 
                    label="Risk Index" 
                    value={`${market_supervisor_summary?.risk_index ?? 0}/10`} 
                    icon={<Activity size={18} />}
                    color="orange"
                    footer={
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${(market_supervisor_summary?.risk_index || 0) * 10}%` }}></div>
                        </div>
                    }
                />
                <MetricCard 
                    label="Comp. Pressure" 
                    value={`${strategic_insights?.competitive_pressure_score ?? 0}/10`} 
                    icon={<Target size={18} />}
                    color="purple"
                    footer={
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${(strategic_insights?.competitive_pressure_score || 0) * 10}%` }}></div>
                        </div>
                    }
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Strategic Overview */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Executive Summary */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <SectionCard title="Market Supervisor Executive Summary" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.005]">
                             <p className="text-slate-100 leading-relaxed font-light text-lg">
                                {market_supervisor_summary?.executive_summary || "No executive summary available."}
                             </p>
                             <div className="mt-6 flex flex-wrap gap-3">
                                 {(market_supervisor_summary?.immediate_actions || []).map((action, i) => (
                                     <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg text-sm text-slate-200 flex items-center gap-2 hover:bg-white/15 transition-colors duration-200">
                                         <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                         {action}
                                     </div>
                                 ))}
                             </div>
                        </SectionCard>
                    </div>

                    {/* Signal Analysis */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                         <SectionCard title="Signal Analysis & Interpretation">
                            <div className="space-y-4">
                                {(signal_analysis?.signals || []).map((signal, idx) => (
                                    <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300 hover:shadow-md">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h4 className="font-semibold text-slate-800">{signal.event_title}</h4>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 whitespace-nowrap">
                                                Confidence: {signal.confidence_score}/10
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">{signal.reason}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(signal.category || "").split('|').map((cat, i) => (
                                                <span key={i} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                                                    {cat.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </SectionCard>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                          <SectionCard title="Strategic Opportunities" className="hover:border-emerald-200">
                              <ul className="space-y-3">
                                  {(strategic_insights?.opportunity_areas || []).map((opp, i) => (
                                      <li key={i} className="flex gap-3 items-start group">
                                          <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg mt-0.5 transition-transform duration-200 group-hover:scale-110">
                                              <TrendingUp size={14} />
                                          </span>
                                          <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{opp}</span>
                                      </li>
                                  ))}
                              </ul>
                          </SectionCard>
                          <SectionCard title="Recommended Moves" className="bg-blue-50/30 border-blue-100 hover:border-blue-200">
                              <ul className="space-y-3">
                                  {(strategic_insights?.recommended_moves || []).map((move, i) => (
                                      <li key={i} className="flex gap-3 items-start group">
                                          <span className="text-blue-500 mt-1 font-bold group-hover:translate-x-0.5 transition-transform">•</span>
                                          <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{move}</span>
                                      </li>
                                  ))}
                              </ul>
                          </SectionCard>
                     </div>
                </div>

                {/* Right Column: News Feed */}
                <div className="lg:col-span-1 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24 hover:shadow-md transition-all duration-300">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Newspaper size={18} className="text-blue-500" />
                                Raw News Feed
                            </h3>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{news.length} events</span>
                        </div>
                        <div className="overflow-y-auto p-3 space-y-2 max-h-[600px] lg:max-h-[calc(100vh-280px)] scrollbar-thin">
                            {news.map((item, idx) => {
                                const isHighImportance = item.importance_score >= 8;
                                const dotColor = isHighImportance ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]';
                                return (
                                    <div 
                                        key={item.event_id || idx}
                                        className="p-3.5 hover:bg-slate-50 rounded-xl group transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-100 hover:translate-x-1"
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Breathing indicator dot */}
                                            <span className="relative flex h-2.5 w-2.5 mt-1 flex-shrink-0">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighImportance ? 'bg-red-400' : 'bg-cyan-400'}`}></span>
                                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`}></span>
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-800 mb-1 leading-snug group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 line-clamp-2 mb-2 leading-relaxed">{item.summary}</p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex gap-1.5 overflow-hidden">
                                                        {(item.companies || []).map((c, i) => (
                                                            <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className={`text-[10px] font-bold whitespace-nowrap ${isHighImportance ? 'text-red-500 bg-red-50 px-1.5 py-0.5 rounded' : 'text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded'}`}>
                                                        Impact: {item.importance_score}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    );
  }

  // Collapsed View (Floating Sidebar Intel Panel)
  return (
    <div 
      onClick={onExpand}
      className="w-full lg:w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/80 p-4 shadow-md 
      hover:shadow-xl hover:border-cyan-400/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-gray-150 pb-3">
          <div>
              <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-cyan-500 rounded-xs"></span>
                  Market Intel
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">{scout_output?.events?.length || 0} New Signals</p>
          </div>
          <div className="relative p-1.5 rounded-lg bg-slate-50 group-hover:bg-cyan-50 text-slate-400 group-hover:text-cyan-500 transition-colors duration-300">
              <Newspaper size={18} />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
          </div>
        </div>
        
        {/* Mini Highlights */}
        <div className="space-y-3">
             {news.slice(0, 4).map((item, idx) => {
               const isHighImportance = item.importance_score >= 8;
               const dotColor = isHighImportance ? 'bg-red-500' : 'bg-cyan-500';
               return (
                 <div key={item.event_id || idx} className="pb-3 border-b border-gray-100 last:border-0 hover:translate-x-1 transition-transform duration-200">
                   <div className="flex items-start gap-2">
                     <span className="relative flex h-2 w-2 mt-1.5 flex-shrink-0">
                       <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighImportance ? 'bg-red-400' : 'bg-cyan-400'}`}></span>
                       <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}></span>
                     </span>
                     <div className="flex-1 min-w-0">
                       <h4 className="text-xs font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                         {item.title}
                       </h4>
                       <div className="flex justify-between items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-400 truncate max-w-[100px]">{item.therapy_area}</span>
                          <span className={`text-[10px] font-bold ${isHighImportance ? 'text-red-500' : 'text-slate-500'}`}>Score: {item.importance_score}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-600 bg-cyan-50/70 hover:bg-cyan-100 py-2.5 rounded-xl transition-all duration-300 hover:shadow-inner group-hover:border-cyan-200/50">
            View Analytics <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Helper Components
function MetricCard({ label, value, icon, color, footer }) {
    const colorClasses = {
        blue: "text-blue-600 bg-blue-50 border-blue-100/50",
        red: "text-red-600 bg-red-50 border-red-100/50",
        orange: "text-orange-600 bg-orange-50 border-orange-100/50",
        yellow: "text-yellow-600 bg-yellow-50 border-yellow-100/50",
        purple: "text-purple-600 bg-purple-50 border-purple-100/50",
        green: "text-emerald-600 bg-emerald-50 border-emerald-100/50",
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-[140px] w-full hover:-translate-y-1 hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</span>
                <div className={`p-2 rounded-xl border ${colorClasses[color] || colorClasses.blue} transition-transform duration-300 group-hover:scale-110`}>
                    {icon}
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center py-1">
                <div className="text-2xl font-black text-slate-800 leading-snug">{value}</div>
            </div>
            {footer && <div className="mt-2">{footer}</div>}
        </div>
    );
}

function SectionCard({ title, children, className = "" }) {
    const isDark = className.includes("bg-slate-900") || className.includes("bg-gradient-to-br from-slate-900");
    return (
        <div className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-350 transition-all duration-300 ${className}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-cyan-400' : 'text-slate-500'}`}>{title}</h3>
            {children}
        </div>
    );
}