import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Dashboard = ({ token, onLogout }) => {
    const [email, setEmail] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [adText, setAdText] = useState('');
    const [adResult, setAdResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEmailScan = async () => {
        if (!email) {
            alert('Please enter an email');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/scan/email`, { email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setScanResult(response.data);
        } catch (error) {
            alert('Scan failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
        setLoading(false);
    };

    const handleAdAnalysis = async () => {
        if (!adText) {
            alert('Please enter ad text');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/scan/ad`, { adText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdResult(response.data);
        } catch (error) {
            alert('Analysis failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
            {/* Header */}
            <header className="bg-[#13131a] border-b border-[#2a2a35] px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-white">🛡️ BeWare</h1>
                <button onClick={onLogout} className="text-red-400 hover:text-red-300">
                    Logout
                </button>
            </header>
            
            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Dashboard</h2>
                
                {/* Email Scanner */}
                <div className="card p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        <i className="fas fa-envelope mr-2 text-[#1a5cff]"></i>
                        Email Breach Scanner
                    </h3>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="input flex-1"
                        />
                        <button onClick={handleEmailScan} disabled={loading} className="btn-primary">
                            {loading ? 'Scanning...' : 'Scan'}
                        </button>
                    </div>
                    
                    {scanResult && (
                        <div className="mt-4 p-4 bg-[#0f0f12] rounded-lg border border-[#2a2a35]">
                            <p className={scanResult.breachCount > 0 ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}>
                                {scanResult.breachCount > 0 
                                    ? `⚠️ Found in ${scanResult.breachCount} breach(es)` 
                                    : '✅ No breaches found'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">Risk Score: {scanResult.riskScore}%</p>
                            {scanResult.breaches?.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {scanResult.breaches.map((b, i) => (
                                        <div key={i} className="border-l-2 border-red-500 pl-3">
                                            <p className="font-medium">{b.Name}</p>
                                            <p className="text-xs text-gray-400">{b.BreachDate}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Ad Analyzer */}
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        <i className="fas fa-ad mr-2 text-[#1a5cff]"></i>
                        Ad Manipulation Detector
                    </h3>
                    <textarea
                        value={adText}
                        onChange={(e) => setAdText(e.target.value)}
                        placeholder="Paste advertisement text here...&#10;&#10;Example: 'Limited time offer! Only 2 left in stock!'"
                        rows="4"
                        className="input w-full resize-none mb-4"
                    />
                    <button onClick={handleAdAnalysis} disabled={loading} className="btn-primary w-full">
                        {loading ? 'Analyzing...' : 'Analyze Ad'}
                    </button>
                    
                    {adResult && (
                        <div className="mt-4 p-4 bg-[#0f0f12] rounded-lg border border-[#2a2a35]">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-400">Manipulation Score</span>
                                <span className={`text-2xl font-bold ${adResult.manipulationScore >= 50 ? 'text-red-400' : 'text-green-400'}`}>
                                    {adResult.manipulationScore}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                <div className="bg-[#1a5cff] h-2 rounded-full" style={{ width: `${adResult.manipulationScore}%` }}></div>
                            </div>
                            <p className="text-sm mb-3">
                                Urgency Level: <span className={`font-semibold ${
                                    adResult.urgencyLevel === 'High' ? 'text-red-400' : 
                                    adResult.urgencyLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                                }`}>{adResult.urgencyLevel}</span>
                            </p>
                            {adResult.detectedTactics?.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Detected Tactics:</p>
                                    <div className="space-y-2">
                                        {adResult.detectedTactics.map((t, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                                                <span className="text-lg">🎯</span>
                                                <div>
                                                    <p className="font-medium text-sm">{t.name}</p>
                                                    <p className="text-xs text-gray-400">Impact: +{t.weight}%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;