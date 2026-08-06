import React from 'react';

const RiskGauge = ({ score = 0, label = 'PRIVACY RISK INDEX' }) => {
  const getSeverity = () => {
    if (score >= 60) {
      return {
        color: '#dc2626',
        text: 'text-red-500',
        bg: 'bg-red-950/20',
        border: 'border-red-900/40',
        status: 'CRITICAL THREAT LEVEL'
      };
    }
    if (score >= 30) {
      return {
        color: '#f59e0b',
        text: 'text-amber-500',
        bg: 'bg-amber-950/20',
        border: 'border-amber-900/40',
        status: 'ELEVATED EXPOSURE'
      };
    }
    return {
      color: '#10b981',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-900/40',
      status: 'OPTIMAL DEFENSIVE STATE'
    };
  };

  const severity = getSeverity();
  const angle = -90 + (score / 100) * 180;
  const strokeDashoffset = 173 - (score / 100) * 173;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#060709] border border-[#1e222a] rounded-xl text-center relative overflow-hidden">
      {/* Background Subtle Radar Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e222a_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Label Header */}
      <div className="flex items-center gap-1.5 mb-2 z-10">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: severity.color }} />
        <span className="text-[10px] font-mono font-medium tracking-widest text-[#71717a] uppercase">
          {label}
        </span>
      </div>

      {/* Signature Radar Gauge */}
      <div className="relative w-40 h-22 flex items-center justify-center my-2 z-10">
        <svg className="w-40 h-22 overflow-visible" viewBox="0 0 140 70">
          {/* Outer Segment Tick Marks */}
          <path d="M 10 60 A 60 60 0 0 1 130 60" fill="none" stroke="#1e222a" strokeWidth="2" strokeDasharray="3 4" />
          
          {/* Inner Rail Arc */}
          <path d="M 20 60 A 50 50 0 0 1 120 60" fill="none" stroke="#101216" strokeWidth="8" strokeLinecap="square" />
          
          {/* Active Value Arc */}
          <path
            d="M 20 60 A 50 50 0 0 1 120 60"
            fill="none"
            stroke={severity.color}
            strokeWidth="8"
            strokeLinecap="square"
            strokeDasharray="157"
            strokeDashoffset={157 - (score / 100) * 157}
            className="transition-all duration-700 ease-out"
          />

          {/* Tactical Needle Pointer */}
          <g transform={`rotate(${angle} 70 60)`} className="transition-transform duration-700 ease-out">
            <line x1="70" y1="60" x2="70" y2="20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="70" cy="60" r="5" fill={severity.color} stroke="#060709" strokeWidth="2" />
          </g>
        </svg>

        {/* Big Score Display */}
        <div className="absolute bottom-0 text-center">
          <span className="font-display text-3xl font-bold tracking-tight text-white">
            {score}
          </span>
          <span className="text-xs text-[#71717a] font-mono ml-0.5">%</span>
        </div>
      </div>

      {/* Classification Tag */}
      <div className={`mt-2 px-3 py-1 rounded text-[10px] font-mono font-semibold tracking-wider ${severity.bg} ${severity.border} ${severity.text} border z-10`}>
        {severity.status}
      </div>
    </div>
  );
};

export default RiskGauge;
