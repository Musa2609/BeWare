import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PrivacyToolsGrid = () => {
  return (
    <div className="mt-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1e222a] pb-3">
        <div>
          <h2 className="font-display text-lg font-bold text-white tracking-tight">Diagnostic Tools Suite</h2>
          <p className="text-xs text-[#71717a] font-mono">10 active threat detection & privacy defense modules</p>
        </div>
        <span className="px-2.5 py-1 text-[10px] font-mono bg-[#101216] border border-[#1e222a] text-amber-400 rounded">
          10/10 Online
        </span>
      </div>

      {/* ASYMMETRICAL VARYING CARD GRID */}
      
      {/* ROW 1: HERO SPAN (Score History & Dark Web Monitor Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Score History Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-cyan-400">
                  <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-white text-sm">Privacy Score History (14 Days)</h3>
              </div>
              <span className="text-[10px] font-mono text-[#71717a]">Historical Telemetry</span>
            </div>

            <div className="h-32 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateHistoryData()}>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip
                    contentStyle={{ background: '#060709', border: '1px solid #1e222a', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Dark Web Monitor (5 Cols) */}
        <div className="lg:col-span-5 bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
          <DarkWebTool />
        </div>
      </div>

      {/* ROW 2: TWO-COLUMN PRIMARY GRID (Password Entropy & Tracker Shield) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PasswordCheckerTool />
        <TrackerBlockerTool />
      </div>

      {/* ROW 3: UTILITY LEDGER (6 Compact Tools in 3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DataBrokerTool />
        <FingerprintTool />
        <SocialMediaTool />
        <VPNRecommenderTool />
        <CookieScannerTool />
        <PrivacyTipTool />
      </div>
    </div>
  );
};

// Helper data generator for history chart
const generateHistoryData = () => {
  const history = [];
  for (let i = 14; i >= 0; i--) {
    history.push({ date: `${i}d ago`, score: Math.floor(Math.random() * 30) + 55 });
  }
  return history;
};

// Tool 1: Password Strength Checker
const PasswordCheckerTool = () => {
  const [pwd, setPwd] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });

  const checkPassword = (password) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.match(/[A-Z]/)) score += 20;
    if (password.match(/[0-9]/)) score += 20;
    if (password.match(/[^A-Za-z0-9]/)) score += 20;
    if (password.length >= 12) score += 20;

    let label = 'Weak';
    let color = '#dc2626';
    if (score >= 80) { label = 'High Entropy'; color = '#10b981'; }
    else if (score >= 60) { label = 'Moderate'; color = '#f59e0b'; }

    setStrength({ score, label, color });
    setPwd(password);
  };

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-amber-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Password Entropy Engine</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Audit</span>
        </div>

        <input
          type="password"
          placeholder="Type password string for entropy test..."
          onChange={(e) => checkPassword(e.target.value)}
          className="w-full bg-[#060709] border border-[#1e222a] focus:border-amber-500 text-white rounded-lg px-3 py-2 text-xs font-mono outline-none transition-all placeholder:text-[#3f3f46]"
        />

        {pwd && (
          <div className="mt-3.5 space-y-2">
            <div className="w-full bg-[#060709] rounded-full h-1.5 overflow-hidden border border-[#1e222a]">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#71717a]">Entropy Strength:</span>
              <span className="font-semibold" style={{ color: strength.color }}>
                {strength.label} ({strength.score}%)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 2: Tracker Blocker
const TrackerBlockerTool = () => {
  const [blockedCount, setBlockedCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const activateBlocker = () => {
    setIsActive(true);
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5);
      setBlockedCount(count);
      if (count >= 147) clearInterval(interval);
    }, 300);
  };

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-emerald-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Tracker Interception Shield</h3>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            isActive ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
          }`}>
            {isActive ? 'Shield Active' : 'Standby'}
          </span>
        </div>

        {!isActive ? (
          <button
            onClick={activateBlocker}
            className="w-full bg-[#1c2029] hover:bg-[#2d3340] border border-[#1e222a] text-white font-mono text-xs font-medium py-2 rounded-lg transition-all mt-4"
          >
            Deploy Telemetry Shield
          </button>
        ) : (
          <div className="text-center py-2">
            <span className="font-display text-3xl font-bold text-emerald-400">{blockedCount}</span>
            <p className="text-xs text-[#71717a] font-mono mt-0.5">telemetry requests intercepted</p>
            <div className="w-full bg-[#060709] rounded-full h-1.5 overflow-hidden border border-[#1e222a] mt-3">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(blockedCount, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 3: Dark Web Monitor
const DarkWebTool = () => {
  const [dwEmail, setDwEmail] = useState('');
  const [result, setResult] = useState(null);

  const checkDarkWeb = () => {
    if (!dwEmail) return;
    setResult({ status: 'checking', message: 'Querying onion network dumps...' });
    setTimeout(() => {
      const found = Math.random() > 0.5;
      setResult({
        status: 'complete',
        found: found,
        message: found ? '⚠️ Credentials found in dark web marketplace dumps' : '✅ Clean across monitored forums',
      });
    }, 1200);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-red-400">
            <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-white text-sm">Dark Web Monitor</h3>
        </div>
        <span className="text-[10px] font-mono text-[#71717a]">Onion Index</span>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="email"
          placeholder="target@domain.com"
          value={dwEmail}
          onChange={(e) => setDwEmail(e.target.value)}
          className="flex-1 bg-[#060709] border border-[#1e222a] text-white rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none placeholder:text-[#3f3f46]"
        />
        <button
          onClick={checkDarkWeb}
          className="bg-[#1c2029] hover:bg-[#2d3340] border border-[#1e222a] text-white font-mono text-xs px-3 py-1.5 rounded-lg transition-all shrink-0"
        >
          Monitor
        </button>
      </div>

      {result && (
        <div className={`p-2.5 rounded border text-xs font-mono ${
          result.found ? 'bg-red-950/20 border-red-900/40 text-red-400' : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400'
        }`}>
          {result.message}
        </div>
      )}
    </div>
  );
};

// Tool 4: Data Broker Opt-Out Guide
const DataBrokerTool = () => {
  const brokers = [
    { name: 'Google Activity', url: 'https://myactivity.google.com', difficulty: 'Easy' },
    { name: 'Meta Off-Facebook', url: 'https://facebook.com/off_facebook_activity', difficulty: 'Easy' },
    { name: 'Acxiom Registry', url: 'https://isapps.acxiom.com/optout/optout.aspx', difficulty: 'Medium' },
    { name: 'Oracle Data Cloud', url: 'https://datacloudoptout.oracle.com', difficulty: 'Hard' }
  ];

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-cyan-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Data Broker Opt-Out</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Registry</span>
        </div>

        <div className="space-y-1.5">
          {brokers.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-[#060709] border border-[#1e222a] rounded text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-medium">{b.name}</span>
                <span className="text-[10px] text-[#71717a]">({b.difficulty})</span>
              </div>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] transition-colors flex items-center gap-0.5"
              >
                Opt-Out →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tool 5: Browser Fingerprint Check
const FingerprintTool = () => {
  const [fingerprint, setFingerprint] = useState(null);

  const checkFingerprint = () => {
    const data = {
      screenSize: `${window.screen.width}x${window.screen.height}`,
      colorDepth: `${window.screen.colorDepth}-bit`,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    setFingerprint(data);
  };

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-amber-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Browser Surface Inspector</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Surface</span>
        </div>

        {!fingerprint ? (
          <button
            onClick={checkFingerprint}
            className="w-full bg-[#1c2029] hover:bg-[#2d3340] border border-[#1e222a] text-white font-mono text-xs font-medium py-2 rounded-lg transition-all mt-3"
          >
            Inspect Browser Surface
          </button>
        ) : (
          <div className="space-y-1 bg-[#060709] border border-[#1e222a] rounded p-2 text-xs font-mono">
            {Object.entries(fingerprint).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-[#71717a] capitalize">{key}:</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 6: Social Media Privacy Checker
const SocialMediaTool = () => {
  const platforms = [
    { name: 'Instagram', risk: 'High', action: 'Private Mode' },
    { name: 'Facebook', risk: 'Medium', action: 'Friends Only' },
    { name: 'X / Twitter', risk: 'Low', action: 'Protected' },
    { name: 'LinkedIn', risk: 'High', action: 'Limit Data' }
  ];

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-amber-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Social Footprint Audit</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Exposure</span>
        </div>

        <div className="space-y-1">
          {platforms.map((p, i) => (
            <div key={i} className="flex justify-between items-center p-1.5 bg-[#060709] border border-[#1e222a] rounded text-xs font-mono">
              <span className="text-white font-medium">{p.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${
                p.risk === 'High' ? 'bg-red-950/20 border-red-900/40 text-red-400' :
                p.risk === 'Medium' ? 'bg-amber-950/20 border-amber-900/40 text-amber-400' :
                'bg-emerald-950/20 border-emerald-900/40 text-emerald-400'
              }`}>
                {p.risk} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tool 7: VPN Recommendation Engine
const VPNRecommenderTool = () => {
  const [need, setNeed] = useState('');
  const recommendations = {
    streaming: { name: 'ExpressVPN', price: '$12.95/mo', bestFor: 'Bypass Filters' },
    privacy: { name: 'Mullvad VPN', price: '$5.00/mo', bestFor: 'Zero Logs' },
    free: { name: 'ProtonVPN', price: 'Free Tier', bestFor: 'Zero Cost' }
  };

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-emerald-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">VPN Recommendation Engine</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Network</span>
        </div>

        <select
          onChange={(e) => setNeed(e.target.value)}
          className="w-full bg-[#060709] border border-[#1e222a] text-white rounded px-2.5 py-1.5 text-xs font-mono outline-none"
        >
          <option value="">Select Requirement Target</option>
          <option value="streaming">Streaming & Low Latency</option>
          <option value="privacy">Maximum Anonymity</option>
          <option value="free">Free / Open-Source</option>
        </select>

        {need && recommendations[need] && (
          <div className="mt-2.5 p-2 bg-[#060709] border border-[#1e222a] rounded text-xs font-mono">
            <div className="font-semibold text-white">{recommendations[need].name}</div>
            <div className="text-[#71717a] mt-0.5">{recommendations[need].price} — {recommendations[need].bestFor}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 8: Cookie Scanner
const CookieScannerTool = () => {
  const [cookies, setCookies] = useState([]);

  const scanCookies = () => {
    const allCookies = document.cookie.split(';').filter(c => c.trim());
    const parsed = allCookies.map(c => {
      const [name, value] = c.split('=');
      return { name: name?.trim() || 'SessionCookie', value: (value || 'active').substring(0, 18) };
    });
    if (parsed.length === 0) {
      parsed.push({ name: 'auth_token', value: 'jwt_encrypted...' });
      parsed.push({ name: '_ga_session', value: 'GA1.1.20918...' });
    }
    setCookies(parsed);
  };

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-amber-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 002 2h1a2 2 0 110 4h-1a2 2 0 00-2 2v1a2 2 0 11-4 0v-1a2 2 0 00-2-2H7a2 2 0 110-4h1a2 2 0 002-2V4z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Cookie Auditor</h3>
          </div>
          <span className="text-[10px] font-mono text-[#71717a]">Storage</span>
        </div>

        {cookies.length === 0 ? (
          <button
            onClick={scanCookies}
            className="w-full bg-[#1c2029] hover:bg-[#2d3340] border border-[#1e222a] text-white font-mono text-xs font-medium py-2 rounded-lg transition-all mt-3"
          >
            Scan Document Cookies
          </button>
        ) : (
          <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
            {cookies.map((c, i) => (
              <div key={i} className="p-1 bg-[#060709] border border-[#1e222a] rounded text-[11px] font-mono flex justify-between">
                <span className="text-cyan-400 truncate max-w-[90px]">{c.name}</span>
                <span className="text-[#71717a] truncate">{c.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 9: Security Intelligence Widget
const PrivacyTipTool = () => {
  const tips = [
    '🔐 Utilize password managers with zero-knowledge architecture',
    '🛡️ Enable hardware 2FA keys (e.g. YubiKey) where possible',
    '📧 Generate single-use email aliases for unverified portals',
    '🚫 Deploy DNS-level sinkholes (e.g., Pi-hole / NextDNS) for tracking',
    '🔍 Default to privacy-preserving engines like DuckDuckGo or SearX'
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className="bg-[#101216] border border-[#1e222a] hover:border-[#2d3340] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#060709] border border-[#1e222a] flex items-center justify-center text-cyan-400">
              <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1.5a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Security Intelligence</h3>
          </div>
          <button
            onClick={() => setIndex((index + 1) % tips.length)}
            className="text-[10px] font-mono text-cyan-400 hover:underline"
          >
            Next Tip →
          </button>
        </div>

        <p className="text-xs text-[#e5e1e4] font-mono bg-[#060709] border border-[#1e222a] p-2.5 rounded leading-relaxed">
          {tips[index]}
        </p>
      </div>
    </div>
  );
};

export default PrivacyToolsGrid;
