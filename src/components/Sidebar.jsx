import { BarChart3, FileText, Newspaper, TrendingUp, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar ({ isOpen, onToggle, setView }) {
  const navItems = [
    { icon: <BarChart3 size={20} />, label: "Dashboard" },
    // { icon: <FileText size={20} />, label: "Reports" },
    // { icon: <TrendingUp size={20} />, label: "Analytics" },
    { icon: <Newspaper size={20} />, label: "News" }
  ];

  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 rounded-xs
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
             <h1 className="
    relative flex items-center text-xl font-extrabold tracking-tight
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
            <button 
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={()=>{setActive(item.label); 
                  onToggle();
                  setView(item.label.toLowerCase());
                }}
                className={`
                  group w-full flex items-center gap-3 py-3 pl-4 pr-3 rounded-xl
                  transition-all duration-300 relative overflow-hidden
                  ${active === item.label 
                    ? 'bg-gradient-to-r from-cyan-50/70 to-teal-50/30 text-cyan-700 font-bold border-l-4 border-cyan-500 rounded-l-none shadow-[0_4px_12px_rgba(6,182,212,0.05)]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <span className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${active === item.label ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                
                {/* Subtle pulse/light overlay for selected */}
                {active === item.label && (
                  <span className="absolute inset-0 bg-cyan-400/5 pointer-events-none" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          {/* <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@company.com</p>
              </div>
            </div>
          </div> */}
        </div>
      </aside>
    </>
  );
};