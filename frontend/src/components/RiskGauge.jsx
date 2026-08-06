import React from 'react';

const RiskGauge = ({ score = 0, label = 'PRIVACY RISK SCORE' }) => {
  const getColorScheme = () => {
    if (score >= 60) {
      return { stroke: '#ef4444', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', status: 'High Risk' };
    }
    if (score >= 30) {
      return { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', status: 'Medium Risk' };
    }
    return { stroke: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', status: 'Low Risk' };
  };

  const scheme = getColorScheme();
  const angle = -90 + (score / 100) * 180;
  const dashOffset = 173 - (score / 100) * 173;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#09090b] border border-[#27272a] rounded-xl text-center">
      <span className="text-[11px] font-mono font-medium tracking-widest text-[#a1a1aa] uppercase mb-3">
        {label}
      </span>
      
      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-36 h-20 flex items-center justify-center my-1">
        <svg className="w-36 h-20 overflow-visible" viewBox="0 0 140 70">
          {/* Background Arc */}
          <path
            d="M 15 60 A 55 55 0 0 1 125 60"
            fill="none"
            stroke="#27272a"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active Arc */}
          <path
            d="M 15 60 A 55 55 0 0 1 125 60"
            fill="none"
            stroke={scheme.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="173"
            strokeDashoffset={dashOffset}
            className="transition-all duration-700 ease-out"
          />
          {/* Needle Indicator */}
          <g transform={`rotate(${angle} 70 60)`} className="transition-transform duration-700 ease-out">
            <line x1="70" y1="60" x2="70" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="70" cy="60" r="6" fill={scheme.stroke} stroke="#09090b" strokeWidth="2" />
          </g>
        </svg>

        {/* Numeric Score Overlay */}
        <div className="absolute bottom-0 text-center">
          <span className={`text-3xl font-mono font-bold tracking-tight ${scheme.text}`}>
            {score}
          </span>
          <span className="text-xs text-[#a1a1aa] font-mono">%</span>
        </div>
      </div>

      {/* Status Severity Badge */}
      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-mono font-medium ${scheme.bg} ${scheme.border} ${scheme.text} border`}>
        {scheme.status}
      </div>
    </div>
  );
};

export default RiskGauge;
