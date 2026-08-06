import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import AuthView from './components/AuthView';
import CoreScanners from './components/CoreScanners';
import PrivacyToolsGrid from './components/PrivacyToolsGrid';

const API_URL = 'https://beware-1.onrender.com/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [scanEmail, setScanEmail] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [adText, setAdText] = useState('');
  const [adResult, setAdResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API_URL}${endpoint}`, { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      alert(response.data.message || 'Authentication successful');
    } catch (error) {
      alert(error.response?.data?.error || 'Authentication failed');
    }
    setLoading(false);
  };

  // Handle Email Scan
  const handleEmailScan = async () => {
    if (!scanEmail) {
      alert('Please enter an email');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/scan/email`,
        { email: scanEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScanResult(response.data);
    } catch (error) {
      alert('Scan failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
    setLoading(false);
  };

  // Handle Ad Analysis
  const handleAdAnalysis = async () => {
    if (!adText) {
      alert('Please enter ad text');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/scan/ad`,
        { adText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdResult(response.data);
    } catch (error) {
      alert('Analysis failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
    setLoading(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setScanResult(null);
    setAdResult(null);
  };

  // Copy to Clipboard
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy');
    }
  };

  // Download PDF / HTML Report
  const downloadPDFReport = () => {
    const reportContent = generateReportHTML();
    const blob = new Blob([reportContent], { type: 'text/html' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `beware_forensic_report_${new Date().toISOString().slice(0, 19)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
    <title>BeWare Forensic Audit Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'JetBrains Mono', monospace, sans-serif; background: #060709; color: #e5e1e4; padding: 40px; }
        .container { max-width: 800px; margin: 0 auto; background: #101216; border: 1px solid #1e222a; border-radius: 16px; padding: 32px; }
        .header { text-align: center; border-bottom: 2px solid #1e222a; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 32px; margin-bottom: 8px; }
        h1 { color: white; font-size: 24px; font-family: 'Space Grotesk', sans-serif; tracking-tight; }
        .section { margin-bottom: 30px; padding: 20px; background: #060709; border-radius: 12px; border-left: 3px solid #f59e0b; }
        .section h2 { color: #f59e0b; margin-bottom: 15px; font-size: 16px; }
        .risk-score { font-size: 40px; font-weight: bold; margin: 10px 0; }
        .risk-low { color: #10b981; } .risk-medium { color: #f59e0b; } .risk-high { color: #dc2626; }
        .progress-bar { width: 100%; height: 8px; background: #1e222a; border-radius: 8px; overflow: hidden; margin: 15px 0; }
        .progress-fill { height: 100%; border-radius: 8px; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #1e222a; margin-top: 20px; font-size: 11px; color: #71717a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🛡️</div>
            <h1>BeWare Forensic Privacy Report</h1>
            <div style="color: #71717a; font-size: 12px; margin-top: 5px;">Timestamp: ${new Date().toLocaleString()}</div>
        </div>
        ${scanResult ? `
        <div class="section">
            <h2>📧 Email Compromise Analysis</h2>
            <p><strong>Target Address:</strong> ${scanResult.email}</p>
            <div class="risk-score ${scanResult.riskScore >= 60 ? 'risk-high' : (scanResult.riskScore >= 30 ? 'risk-medium' : 'risk-low')}">${scanResult.riskScore}% Compromise Index</div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${scanResult.riskScore}%; background: ${scanResult.riskScore >= 60 ? '#dc2626' : (scanResult.riskScore >= 30 ? '#f59e0b' : '#10b981')}"></div></div>
            <p>${scanResult.breachCount === 0 ? '✅ No credential leaks found' : `⚠️ Identified in ${scanResult.breachCount} data dump(s)`}</p>
        </div>` : ''}
        ${adResult ? `
        <div class="section">
            <h2>🎯 Ad Manipulation Analysis</h2>
            <div class="risk-score ${adResult.manipulationScore >= 60 ? 'risk-high' : (adResult.manipulationScore >= 30 ? 'risk-medium' : 'risk-low')}">${adResult.manipulationScore}% Manipulation Index</div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${adResult.manipulationScore}%; background: ${adResult.manipulationScore >= 60 ? '#dc2626' : (adResult.manipulationScore >= 30 ? '#f59e0b' : '#10b981')}"></div></div>
            <p>Urgency Rating: ${adResult.urgencyLevel}</p>
        </div>` : ''}
        <div class="footer"><p>BeWare — Digital Privacy & Cybersecurity Terminal</p></div>
    </div>
</body>
</html>`;
  };

  // Render Authentication Screen if no token
  if (!token) {
    return (
      <AuthView
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuth={handleAuth}
        loading={loading}
      />
    );
  }

  // Render Main Console Terminal
  return (
    <div className="min-h-screen bg-[#060709] text-[#e5e1e4] font-sans antialiased selection:bg-amber-500/20 selection:text-amber-400">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e222a] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">Console / Terminal</span>
              <span className="text-xs text-[#2d3340]">•</span>
              <span className="text-[11px] font-mono text-amber-400">Active Audit Session</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Forensic Privacy Terminal
            </h1>
            <p className="text-xs text-[#9ca3af] font-mono mt-1">
              Inspect your digital footprint, audit dark web credential leaks, and intercept manipulative tracking tactics in real time.
            </p>
          </div>
        </div>

        {/* Core Scanners (Email Breach Audit & Ad Manipulation Inspector) */}
        <CoreScanners
          scanEmail={scanEmail}
          setScanEmail={setScanEmail}
          handleEmailScan={handleEmailScan}
          scanResult={scanResult}
          adText={adText}
          setAdText={setAdText}
          handleAdAnalysis={handleAdAnalysis}
          adResult={adResult}
          loading={loading}
          copyToClipboard={copyToClipboard}
          copied={copied}
          downloadPDFReport={downloadPDFReport}
        />

        {/* 10 Privacy Tools Suite */}
        <PrivacyToolsGrid />
      </main>
    </div>
  );
}

export default App;