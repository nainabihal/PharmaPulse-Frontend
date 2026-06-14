import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SearchBar ({ onSearch, loading = false }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4 sm:px-0">
      <div className="relative group">
        <input
          type="text"
          value={query}
          disabled={loading}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? "Analyzing pharmaceutical intelligence..." : "Search for insights, reports, or analytics..."}
          className="w-full px-6 py-4.5 pr-16 text-base border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-md
                   focus:outline-none focus:ring-4 focus:ring-cyan-400/20 focus:border-cyan-400
                   placeholder-slate-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)] 
                   disabled:bg-slate-50/50 disabled:text-slate-400 group-hover:border-slate-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-cyan-500 to-teal-500 
                   text-white rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-md 
                   disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </button>
      </div>
    </form>
  );
};