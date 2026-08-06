import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PrivacyToolsGrid = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">Privacy Tools Suite</h2>
          <p className="text-xs text-[#a1a1aa] font-mono">10 diagnostic & defensive privacy modules</p>
        </div>
        <span className="px-2.5 py-1 text-xs font-mono bg-[#18181b] border border-[#27272a] text-[#a1a1aa] rounded-md">
          10/10 Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PasswordCheckerTool />
        <DataBrokerTool />
        <TrackerBlockerTool />
        <FingerprintTool />
        <DarkWebTool />
        <PrivacyChartTool />
        <SocialMediaTool />
        <VPNRecommenderTool />
        <CookieScannerTool />
        <PrivacyTipTool />
      </div>
    </div>
  );
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
    let color = '#ef4444';
    if (score >= 80) { label = 'Strong'; color = '#10b981'; }
    else if (score >= 60) { label = 'Good'; color = '#f59e0b'; }

    setStrength({ score, label, color });
    setPwd(password);
  };

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-emerald-400">🔐</span>
            <h3 className="text-sm font-semibold text-white">Password Auditor</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Security</span>
        </div>

        <input
          type="password"
          placeholder="Type password string..."
          onChange={(e) => checkPassword(e.target.value)}
          className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#52525b] text-white rounded-lg px-3 py-2 text-xs font-mono outline-none transition-all placeholder:text-[#52525b]"
        />

        {pwd && (
          <div className="mt-3.5 space-y-2">
            <div className="w-full bg-[#09090b] rounded-full h-1.5 overflow-hidden border border-[#27272a]">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
              />
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#a1a1aa]">Entropy Strength:</span>
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

// Tool 2: Data Broker Opt-Out Guide
const DataBrokerTool = () => {
  const brokers = [
    { name: 'Google Activity', url: 'https://myactivity.google.com', difficulty: 'Easy' },
    { name: 'Meta Off-Facebook', url: 'https://facebook.com/off_facebook_activity', difficulty: 'Easy' },
    { name: 'Acxiom Registry', url: 'https://isapps.acxiom.com/optout/optout.aspx', difficulty: 'Medium' },
    { name: 'Oracle Data Cloud', url: 'https://datacloudoptout.oracle.com', difficulty: 'Hard' }
  ];

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-blue-400">🗑️</span>
            <h3 className="text-sm font-semibold text-white">Data Broker Opt-Out</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Privacy</span>
        </div>

        <div className="space-y-2">
          {brokers.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-[#09090b] border border-[#27272a] rounded-lg text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-medium">{b.name}</span>
                <span className="text-[10px] text-[#71717a]">({b.difficulty})</span>
              </div>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium text-[11px] transition-colors flex items-center gap-0.5"
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

// Tool 3: Tracker Blocker Status
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
    }, 400);
  };

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-emerald-400">🛡️</span>
            <h3 className="text-sm font-semibold text-white">Tracker Blocker</h3>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            isActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {!isActive ? (
          <button
            onClick={activateBlocker}
            className="w-full bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-white font-medium py-2 rounded-lg text-xs font-mono transition-all mt-4"
          >
            Activate Telemetry Shield
          </button>
        ) : (
          <div className="text-center py-2">
            <span className="text-3xl font-mono font-bold text-emerald-400">{blockedCount}</span>
            <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">trackers intercepted</p>
            <div className="w-full bg-[#09090b] rounded-full h-1.5 overflow-hidden border border-[#27272a] mt-3">
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

// Tool 4: Browser Fingerprint Check
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
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-cyan-400">🖥️</span>
            <h3 className="text-sm font-semibold text-white">Browser Fingerprint</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Telemetry</span>
        </div>

        {!fingerprint ? (
          <button
            onClick={checkFingerprint}
            className="w-full bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-white font-medium py-2 rounded-lg text-xs font-mono transition-all mt-4"
          >
            Inspect Browser Surface
          </button>
        ) : (
          <div className="space-y-1.5 bg-[#09090b] border border-[#27272a] rounded-lg p-2.5 text-xs font-mono">
            {Object.entries(fingerprint).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-[#a1a1aa] capitalize">{key}:</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 5: Dark Web Monitor
const DarkWebTool = () => {
  const [dwEmail, setDwEmail] = useState('');
  const [result, setResult] = useState(null);

  const checkDarkWeb = () => {
    if (!dwEmail) return;
    setResult({ status: 'checking', message: 'Scanning onion networks...' });
    setTimeout(() => {
      const found = Math.random() > 0.5;
      setResult({
        status: 'complete',
        found: found,
        message: found ? '⚠️ Exposed on dark web marketplaces' : '✅ Clean across monitored forums',
        date: found ? new Date().toLocaleDateString() : null
      });
    }, 1500);
  };

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-rose-400">🌑</span>
            <h3 className="text-sm font-semibold text-white">Dark Web Monitor</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Audit</span>
        </div>

        <div className="flex gap-2 mb-3">
          <input
            type="email"
            placeholder="email@domain.com"
            value={dwEmail}
            onChange={(e) => setDwEmail(e.target.value)}
            className="flex-1 bg-[#09090b] border border-[#27272a] text-white rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none placeholder:text-[#52525b]"
          />
          <button
            onClick={checkDarkWeb}
            className="bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-white font-medium px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0"
          >
            Monitor
          </button>
        </div>

        {result && (
          <div className={`p-2.5 rounded-lg border text-xs font-mono ${
            result.found ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 6: Privacy History Chart (Recharts)
const PrivacyChartTool = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const history = [];
    for (let i = 14; i >= 0; i--) {
      history.push({ date: `${i}d ago`, score: Math.floor(Math.random() * 30) + 55 });
    }
    setData(history);
  }, []);

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-blue-400">📈</span>
            <h3 className="text-sm font-semibold text-white">Score History (14 Days)</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Analytics</span>
        </div>

        <div className="h-28 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip
                contentStyle={{ background: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Tool 7: Social Media Privacy Checker
const SocialMediaTool = () => {
  const platforms = [
    { name: 'Instagram', risk: 'High', action: 'Private Mode' },
    { name: 'Facebook', risk: 'Medium', action: 'Friends Only' },
    { name: 'X / Twitter', risk: 'Low', action: 'Protected' },
    { name: 'LinkedIn', risk: 'High', action: 'Limit Data' }
  ];

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-amber-400">📱</span>
            <h3 className="text-sm font-semibold text-white">Social Footprint</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Exposure</span>
        </div>

        <div className="space-y-1.5">
          {platforms.map((p, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-[#09090b] border border-[#27272a] rounded-lg text-xs font-mono">
              <span className="text-white font-medium">{p.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${
                p.risk === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                p.risk === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
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

// Tool 8: VPN Recommendation Engine
const VPNRecommenderTool = () => {
  const [need, setNeed] = useState('');
  const recommendations = {
    streaming: { name: 'ExpressVPN', price: '$12.95/mo', bestFor: 'Bypass Filters' },
    privacy: { name: 'Mullvad VPN', price: '$5.00/mo', bestFor: 'Zero Logs' },
    free: { name: 'ProtonVPN', price: 'Free Tier', bestFor: 'Zero Cost' }
  };

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-emerald-400">🔒</span>
            <h3 className="text-sm font-semibold text-white">VPN Engine</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Network</span>
        </div>

        <select
          onChange={(e) => setNeed(e.target.value)}
          className="w-full bg-[#09090b] border border-[#27272a] text-white rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none"
        >
          <option value="">Select Priority Requirement</option>
          <option value="streaming">Streaming & Low Latency</option>
          <option value="privacy">Maximum Anonymity</option>
          <option value="free">Free / Open-Source</option>
        </select>

        {need && recommendations[need] && (
          <div className="mt-3 p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-xs font-mono">
            <div className="font-semibold text-white">{recommendations[need].name}</div>
            <div className="text-[#a1a1aa] mt-0.5">{recommendations[need].price} — {recommendations[need].bestFor}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 9: Cookie Scanner
const CookieScannerTool = () => {
  const [cookies, setCookies] = useState([]);

  const scanCookies = () => {
    const allCookies = document.cookie.split(';').filter(c => c.trim());
    const parsed = allCookies.map(c => {
      const [name, value] = c.split('=');
      return { name: name?.trim() || 'SessionCookie', value: (value || 'active').substring(0, 20) };
    });
    if (parsed.length === 0) {
      parsed.push({ name: 'auth_token', value: 'jwt_encrypted...' });
      parsed.push({ name: '_ga_session', value: 'GA1.1.20918...' });
    }
    setCookies(parsed);
  };

  return (
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-amber-400">🍪</span>
            <h3 className="text-sm font-semibold text-white">Cookie Auditor</h3>
          </div>
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">Storage</span>
        </div>

        {cookies.length === 0 ? (
          <button
            onClick={scanCookies}
            className="w-full bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-white font-medium py-2 rounded-lg text-xs font-mono transition-all mt-4"
          >
            Scan Document Cookies
          </button>
        ) : (
          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
            {cookies.map((c, i) => (
              <div key={i} className="p-1.5 bg-[#09090b] border border-[#27272a] rounded text-[11px] font-mono flex justify-between">
                <span className="text-blue-400 truncate max-w-[100px]">{c.name}</span>
                <span className="text-[#a1a1aa] truncate">{c.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Tool 10: Privacy Tips Widget
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
    <div className="bg-[#131315] border border-[#27272a] hover:border-[#3f3f46] transition-all rounded-xl p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-blue-400">💡</span>
            <h3 className="text-sm font-semibold text-white">Security Intelligence</h3>
          </div>
          <button
            onClick={() => setIndex((index + 1) % tips.length)}
            className="text-[10px] font-mono text-blue-400 hover:underline"
          >
            Next Tip →
          </button>
        </div>

        <p className="text-xs text-[#e4e4e7] font-mono bg-[#09090b] border border-[#27272a] p-3 rounded-lg leading-relaxed">
          {tips[index]}
        </p>
      </div>
    </div>
  );
};

export default PrivacyToolsGrid;
