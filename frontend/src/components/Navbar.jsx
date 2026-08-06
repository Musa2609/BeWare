import React from 'react';

const Navbar = ({ onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#060709]/85 backdrop-blur-md border-b border-[#1e222a] px-6 py-3 flex items-center justify-between">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-md bg-[#101216] border border-[#1e222a] flex items-center justify-center text-amber-500 shadow-inner shrink-0">
          <svg className="w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-white text-base tracking-tight">BeWare</span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded">
              v1.0.4-forensic
            </span>
          </div>
          <p className="text-[11px] text-[#71717a] font-mono hidden sm:block">Digital Privacy & Cybersecurity Terminal</p>
        </div>
      </div>

      {/* Telemetry Status & Session Controls */}
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#9ca3af]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Telemetry: System Active</span>
          <span className="text-[#3b3b45]">|</span>
          <span className="text-[#71717a]">Signal-to-Noise: Optimal</span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#dc2626] hover:text-red-300 hover:bg-red-950/30 border border-[#1e222a] hover:border-red-900/40 rounded transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Terminate Session
        </button>
      </div>
    </header>
  );
};

export default Navbar;
