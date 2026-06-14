import { Menu } from "lucide-react";

export default function Header ({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 hover:bg-slate-100/80 rounded-xl transition-colors text-slate-600"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-base font-bold text-slate-800 tracking-wide ml-1 lg:ml-0">Search & Insights</h2>
      </div>
      
      {/* Decorative pulse indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline">Engine Online</span>
      </div>
    </header>
  );
};