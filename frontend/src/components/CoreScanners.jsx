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
      {/* ASYMMETRICAL 60/40 SPLIT CONSOLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT 60% — EMAIL COMPROMISE AUDIT CONSOLE */}
        <div className="lg:col-span-7 bg-[#101216] border border-[#1e222a] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#060709] border border-[#1e222a] flex items-center justify-center text-amber-500 shrink-0">
                  <svg className="w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display font-bold text-[#ffffff] text-base tracking-tight">Email Compromise Audit</h2>
                  <p className="text-xs text-[#71717a] font-mono">Cross-reference target address against monitored dark web dumps</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded">
                Live Query
              </span>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <input
                type="email"
                value={scanEmail}
                onChange={(e) => setScanEmail(e.target.value)}
                placeholder="Enter target email (e.g. operator@domain.com)..."
                className="flex-1 bg-[#060709] border border-[#1e222a] focus:border-amber-500 text-white rounded-lg px-3.5 py-2.5 text-xs font-mono outline-none transition-all placeholder:text-[#3f3f46]"
              />
              <button
                onClick={handleEmailScan}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-[#060709] font-mono font-semibold px-4 py-2.5 rounded-lg text-xs tracking-wide transition-all duration-150 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#060709] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Run Breach Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Breach Result Output */}
          {scanResult ? (
            <div className="pt-4 border-t border-[#1e222a] grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              <div className="sm:col-span-5">
                <RiskGauge score={scanResult.riskScore} label="COMPROMISE RISK INDEX" />
              </div>

              <div className="sm:col-span-7 bg-[#060709] border border-[#1e222a] rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#71717a] uppercase tracking-wider">Audit Result</span>
                    <button
                      onClick={() => copyToClipboard(`Target: ${scanResult.email}\nBreaches: ${scanResult.breachCount}\nRisk Index: ${scanResult.riskScore}%`, 'Summary')}
                      className="flex items-center gap-1 text-[10px] font-mono text-[#9ca3af] hover:text-white bg-[#101216] border border-[#1e222a] px-2 py-0.5 rounded transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Telemetry'}
                    </button>
                  </div>

                  <div className={`p-2.5 rounded text-xs font-mono font-medium mb-2.5 ${
                    scanResult.breachCount > 0 
                      ? 'bg-red-950/20 border border-red-900/40 text-red-400' 
                      : 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-400'
                  }`}>
                    {scanResult.breachCount > 0 
                      ? `⚠️ Discovered in ${scanResult.breachCount} compromised repository dump(s)` 
                      : '✅ No compromise detected across active database dumps'}
                  </div>

                  {scanResult.breaches?.length > 0 && (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                      {scanResult.breaches.map((b, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-[#101216] border border-[#1e222a] rounded text-[11px] font-mono">
                          <span className="font-medium text-white">{b.Name}</span>
                          <span className="text-[#71717a]">{b.BreachDate}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#060709] border border-[#1e222a] border-dashed rounded-lg text-center text-xs font-mono text-[#71717a]">
              Awaiting query execution... Enter email above to audit leaks.
            </div>
          )}
        </div>

        {/* RIGHT 40% — AD DARK-PATTERN INSPECTOR */}
        <div className="lg:col-span-5 bg-[#101216] border border-[#1e222a] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#060709] border border-[#1e222a] flex items-center justify-center text-cyan-400 shrink-0">
                  <svg className="w-4 h-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display font-bold text-[#ffffff] text-base tracking-tight">Dark-Pattern Inspector</h2>
                  <p className="text-xs text-[#71717a] font-mono">Deconstruct psychological manipulation in marketing copy</p>
                </div>
              </div>
            </div>

            <textarea
              value={adText}
              onChange={(e) => setAdText(e.target.value)}
              placeholder="Paste suspicious copy, marketing email, or promotional text for dark-pattern decomposition..."
              rows={3}
              className="w-full bg-[#060709] border border-[#1e222a] focus:border-amber-500 text-white rounded-lg p-3 text-xs font-mono outline-none transition-all placeholder:text-[#3f3f46] resize-none mb-3"
            />

            <button
              onClick={handleAdAnalysis}
              disabled={loading}
              className="w-full bg-[#1c2029] hover:bg-[#2d3340] border border-[#1e222a] text-white font-mono text-xs font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-cyan-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Deconstruct Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Ad Analysis Result */}
          {adResult ? (
            <div className="mt-4 pt-4 border-t border-[#1e222a]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[#71717a] uppercase">Manipulation Index</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                  adResult.urgencyLevel === 'High' ? 'bg-red-950/20 border-red-900/40 text-red-400' :
                  adResult.urgencyLevel === 'Medium' ? 'bg-amber-950/20 border-amber-900/40 text-amber-400' :
                  'bg-emerald-950/20 border-emerald-900/40 text-emerald-400'
                }`}>
                  {adResult.urgencyLevel} Urgency
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-[#060709] rounded-full h-1.5 overflow-hidden border border-[#1e222a]">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${adResult.manipulationScore}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">{adResult.manipulationScore}%</span>
              </div>

              {adResult.detectedTactics?.length > 0 && (
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {adResult.detectedTactics.map((t, i) => (
                    <div key={i} className="flex justify-between items-center p-1.5 bg-[#060709] border border-[#1e222a] rounded text-[11px] font-mono">
                      <span className="text-white font-medium">{t.name}</span>
                      <span className="text-amber-400">+{t.weight}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-[#060709] border border-[#1e222a] border-dashed rounded-lg text-center text-xs font-mono text-[#71717a] mt-4">
              Paste marketing copy above to inspect manipulation triggers.
            </div>
          )}
        </div>

      </div>

      {/* EXPORT ACTION BANNER */}
      {(scanResult || adResult) && (
        <div className="bg-[#101216] border border-[#1e222a] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-sm font-semibold text-white">Forensic Audit Documentation Ready</h3>
            <p className="text-xs text-[#71717a] font-mono mt-0.5">Export structured report containing query logs and threat ratings</p>
          </div>
          <button
            onClick={downloadPDFReport}
            className="bg-white hover:bg-zinc-200 text-[#060709] font-mono text-xs font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shrink-0 shadow-sm"
          >
            <svg className="w-3.5 h-3.5" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Forensic Audit (.HTML / PDF)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoreScanners;
