import React from 'react';
import RiskGauge from './RiskGauge';

const CoreScanners = ({
  scanEmail,
  setScanEmail,
  handleEmailScan,
  scanResult,
  adText,
  setAdText,
  handleAdAnalysis,
  adResult,
  loading,
  copyToClipboard,
  copied,
  downloadPDFReport
}) => {
  return (
    <div className="space-y-6">
      {/* 1. EMAIL BREACH SCANNER */}
      <div className="bg-[#131315] border border-[#27272a] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">Email Breach Scanner</h2>
              <p className="text-xs text-[#a1a1aa] font-mono">Cross-reference email against active dark web data dumps</p>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={scanEmail}
            onChange={(e) => setScanEmail(e.target.value)}
            placeholder="target.email@domain.com"
            className="flex-1 bg-[#09090b] border border-[#27272a] focus:border-[#52525b] text-white rounded-lg px-3.5 py-2.5 text-sm font-mono outline-none transition-all placeholder:text-[#52525b]"
          />
          <button
            onClick={handleEmailScan}
            disabled={loading}
            className="bg-white hover:bg-zinc-200 text-[#09090b] font-medium px-5 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#09090b] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Execute Scan</span>
              </>
            )}
          </button>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className="mt-5 pt-5 border-t border-[#27272a] grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5">
              <RiskGauge score={scanResult.riskScore} label="EMAIL RISK SCORE" />
            </div>

            <div className="md:col-span-7 bg-[#09090b] border border-[#27272a] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">Breach Status</span>
                  <button
                    onClick={() => copyToClipboard(`Email: ${scanResult.email}\nBreaches: ${scanResult.breachCount}\nRisk: ${scanResult.riskScore}%`, 'Breach Report')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#a1a1aa] hover:text-white bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] rounded-md transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {copied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>

                <div className={`p-3 rounded-lg border text-sm font-medium mb-3 ${
                  scanResult.breachCount > 0 
                    ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}>
                  {scanResult.breachCount > 0 
                    ? `⚠️ Discovered in ${scanResult.breachCount} compromised dataset(s)` 
                    : '✅ No compromise detected across monitored databases'}
                </div>

                {/* Breach List */}
                {scanResult.breaches?.length > 0 && (
                  <div className="space-y-2 mt-3 max-h-40 overflow-y-auto pr-1">
                    <p className="text-xs font-mono text-[#a1a1aa]">Compromised Repositories:</p>
                    {scanResult.breaches.map((b, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-[#131315] border border-[#27272a] rounded-lg text-xs font-mono">
                        <span className="font-medium text-white">{b.Name}</span>
                        <span className="text-[#a1a1aa]">{b.BreachDate}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. AD MANIPULATION DETECTOR */}
      <div className="bg-[#131315] border border-[#27272a] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-amber-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">Ad Manipulation Detector</h2>
              <p className="text-xs text-[#a1a1aa] font-mono">Deconstruct psychological dark patterns & artificial urgency in text copy</p>
            </div>
          </div>
        </div>

        <textarea
          value={adText}
          onChange={(e) => setAdText(e.target.value)}
          placeholder="Paste advertisement, offer text, or marketing copy here..."
          rows={3}
          className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#52525b] text-white rounded-lg p-3.5 text-sm outline-none transition-all placeholder:text-[#52525b] resize-none mb-3"
        />

        <button
          onClick={handleAdAnalysis}
          disabled={loading}
          className="w-full bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] text-white font-medium py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Analyze Manipulation Score</span>
            </>
          )}
        </button>

        {/* Ad Result */}
        {adResult && (
          <div className="mt-5 pt-5 border-t border-[#27272a] grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5">
              <RiskGauge score={adResult.manipulationScore} label="MANIPULATION INDEX" />
            </div>

            <div className="md:col-span-7 bg-[#09090b] border border-[#27272a] rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">Urgency Rating</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
                  adResult.urgencyLevel === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  adResult.urgencyLevel === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}>
                  {adResult.urgencyLevel} Urgency
                </span>
              </div>

              {adResult.detectedTactics?.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-mono text-[#a1a1aa]">Identified Dark Patterns:</p>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {adResult.detectedTactics.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-[#131315] border border-[#27272a] rounded-lg text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400">🎯</span>
                          <span className="font-medium text-white">{t.name}</span>
                        </div>
                        <span className="text-amber-400 font-semibold">+{t.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. EXPORT REPORT BAR */}
      {(scanResult || adResult) && (
        <div className="bg-gradient-to-r from-[#131315] to-[#18181b] border border-blue-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-sm font-semibold text-white">Generate Privacy Audit Documentation</h3>
            <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">Download formatted audit report HTML/PDF for record keeping</p>
          </div>
          <button
            onClick={downloadPDFReport}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-2 shrink-0 shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Audit Report</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoreScanners;
