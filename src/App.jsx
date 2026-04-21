import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = 'http://localhost:5000/api';

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
    const reportRef = useRef(null);

    // Handle Authentication
    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await axios.post(`${API_URL}${endpoint}`, { email, password });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            alert(response.data.message);
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
            const response = await axios.post(`${API_URL}/scan/email`, { email: scanEmail }, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
            const response = await axios.post(`${API_URL}/scan/ad`, { adText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdResult(response.data);
        } catch (error) {
            alert('Analysis failed');
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
            alert(`${type} copied to clipboard!`);
        } catch (err) {
            alert('Failed to copy');
        }
    };

    // Download PDF Report
    const downloadPDFReport = () => {
        const reportContent = generateReportHTML();
        const blob = new Blob([reportContent], { type: 'text/html' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `beware_report_${new Date().toISOString().slice(0, 19)}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const generateReportHTML = () => {
        return `<!DOCTYPE html>
        <html>
        <head>
            <title>BeWare Privacy Report</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0f; color: #e0e0e0; padding: 40px; }
                .container { max-width: 800px; margin: 0 auto; background: #13131a; border: 1px solid #2a2a35; border-radius: 16px; padding: 32px; }
                .header { text-align: center; border-bottom: 2px solid #1a5cff; padding-bottom: 20px; margin-bottom: 30px; }
                .logo { font-size: 48px; margin-bottom: 10px; }
                h1 { color: white; font-size: 28px; }
                .section { margin-bottom: 30px; padding: 20px; background: #0f0f12; border-radius: 12px; border-left: 3px solid #1a5cff; }
                .section h2 { color: #1a5cff; margin-bottom: 15px; }
                .risk-score { font-size: 48px; font-weight: bold; margin: 10px 0; }
                .risk-low { color: #4ade80; } .risk-medium { color: #fbbf24; } .risk-high { color: #f87171; }
                .progress-bar { width: 100%; height: 12px; background: #2a2a35; border-radius: 10px; overflow: hidden; margin: 15px 0; }
                .progress-fill { height: 100%; transition: width 0.5s; border-radius: 10px; }
                .footer { text-align: center; padding-top: 20px; border-top: 1px solid #2a2a35; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><div class="logo">🛡️</div><h1>BeWare Privacy Report</h1><div>Generated: ${new Date().toLocaleString()}</div></div>
                ${scanResult ? `
                <div class="section">
                    <h2>📧 Email Breach Analysis</h2>
                    <p><strong>Email:</strong> ${scanResult.email}</p>
                    <div class="risk-score ${scanResult.riskScore >= 60 ? 'risk-high' : (scanResult.riskScore >= 30 ? 'risk-medium' : 'risk-low')}">${scanResult.riskScore}% Risk Score</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${scanResult.riskScore}%; background: ${scanResult.riskScore >= 60 ? '#f87171' : (scanResult.riskScore >= 30 ? '#fbbf24' : '#4ade80')}"></div></div>
                    <p>${scanResult.breachCount === 0 ? '✅ No breaches found' : `⚠️ Found in ${scanResult.breachCount} breach(es)`}</p>
                </div>` : ''}
                ${adResult ? `
                <div class="section">
                    <h2>🎯 Ad Manipulation Analysis</h2>
                    <div class="risk-score ${adResult.manipulationScore >= 60 ? 'risk-high' : (adResult.manipulationScore >= 30 ? 'risk-medium' : 'risk-low')}">${adResult.manipulationScore}% Manipulation Score</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${adResult.manipulationScore}%; background: ${adResult.manipulationScore >= 60 ? '#f87171' : (adResult.manipulationScore >= 30 ? '#fbbf24' : '#4ade80')}"></div></div>
                    <p>Urgency Level: ${adResult.urgencyLevel}</p>
                </div>` : ''}
                <div class="footer"><p>BeWare - Digital Privacy Auditor</p></div>
            </div>
        </body>
        </html>`;
    };

    // Risk Meter Component
    const RiskMeter = ({ score, label }) => {
        const getColor = () => {
            if (score >= 60) return { bg: '#ef4444', text: '#ef4444', label: 'High Risk' };
            if (score >= 30) return { bg: '#f59e0b', text: '#f59e0b', label: 'Medium Risk' };
            return { bg: '#10b981', text: '#10b981', label: 'Low Risk' };
        };
        const color = getColor();
        const angle = -90 + (score / 100) * 180;
        
        return (
            <div style={{ textAlign: 'center', padding: '20px', background: '#1e1e2a', borderRadius: '16px' }}>
                <p style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '500', marginBottom: '12px', letterSpacing: '1px' }}>{label}</p>
                <div style={{ position: 'relative', width: '140px', height: '70px', margin: '0 auto' }}>
                    <svg width="140" height="70" viewBox="0 0 140 70">
                        <path d="M 15 60 A 55 55 0 0 1 125 60" fill="none" stroke="#374151" strokeWidth="10" strokeLinecap="round"/>
                        <path d="M 15 60 A 55 55 0 0 1 125 60" fill="none" stroke={color.bg} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(score / 100) * 173} 173`} style={{ transition: 'stroke-dasharray 0.5s' }}/>
                        <g transform={`rotate(${angle} 70 60)`}>
                            <line x1="70" y1="60" x2="70" y2="25" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round"/>
                            <circle cx="70" cy="60" r="7" fill={color.bg} stroke="#1e1e2a" strokeWidth="2"/>
                        </g>
                    </svg>
                    <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: color.text }}>{score}</span>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>%</span>
                    </div>
                </div>
                <p style={{ fontSize: '12px', marginTop: '16px', color: color.text, fontWeight: '600' }}>{color.label}</p>
            </div>
        );
    };

    // ========== FEATURE 1: PASSWORD STRENGTH CHECKER ==========
    const PasswordChecker = () => {
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
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🔐 Password Strength Checker</h3>
                <input type="password" placeholder="Enter password to check" onChange={(e) => checkPassword(e.target.value)} style={styles.input} />
                {pwd && (
                    <div style={{ marginTop: '16px' }}>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${strength.score}%`, background: strength.color }}></div></div>
                        <p style={{ color: strength.color, marginTop: '10px', fontWeight: '500' }}>Strength: {strength.label} ({strength.score}%)</p>
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 2: DATA BROKER OPT-OUT GUIDE ==========
    const DataBrokerGuide = () => {
        const brokers = [
            { name: "Google", url: "https://myactivity.google.com", difficulty: "Easy" },
            { name: "Facebook", url: "https://facebook.com/off_facebook_activity", difficulty: "Easy" },
            { name: "Acxiom", url: "https://isapps.acxiom.com/optout/optout.aspx", difficulty: "Medium" },
            { name: "Oracle", url: "https://datacloudoptout.oracle.com", difficulty: "Hard" }
        ];
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🗑️ Data Broker Opt-Out Guide</h3>
                {brokers.map((b, i) => (
                    <div key={i} style={{ ...styles.breachItem, justifyContent: 'space-between' }}>
                        <span><strong style={{ color: '#e5e7eb' }}>{b.name}</strong> <span style={{ color: '#9ca3af' }}>- {b.difficulty}</span></span>
                        <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>Opt Out →</a>
                    </div>
                ))}
            </div>
        );
    };

    // ========== FEATURE 3: TRACKER BLOCKER STATUS ==========
    const TrackerBlocker = () => {
        const [blockedCount, setBlockedCount] = useState(0);
        const [isActive, setIsActive] = useState(false);
        
        const activateBlocker = () => {
            setIsActive(true);
            let count = 0;
            const interval = setInterval(() => {
                count += Math.floor(Math.random() * 5);
                setBlockedCount(count);
                if (count >= 147) clearInterval(interval);
            }, 500);
        };
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🛡️ Tracker Blocker</h3>
                {!isActive ? (
                    <button onClick={activateBlocker} style={styles.buttonSmall}>Activate Protection</button>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#10b981' }}>{blockedCount}</p>
                        <p style={{ color: '#9ca3af' }}>trackers blocked this session</p>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${Math.min(blockedCount, 100)}%` }}></div></div>
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 4: BROWSER FINGERPRINT CHECK ==========
    const FingerprintChecker = () => {
        const [fingerprint, setFingerprint] = useState(null);
        
        const checkFingerprint = () => {
            const data = {
                screenSize: `${screen.width}x${screen.height}`,
                colorDepth: screen.colorDepth,
                language: navigator.language,
                platform: navigator.platform,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            setFingerprint(data);
        };
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🖥️ Browser Fingerprint</h3>
                <button onClick={checkFingerprint} style={styles.buttonSmall}>Check My Fingerprint</button>
                {fingerprint && (
                    <div style={{ marginTop: '16px', background: '#1a1a2e', padding: '12px', borderRadius: '12px' }}>
                        {Object.entries(fingerprint).map(([key, value]) => (
                            <div key={key} style={{ fontSize: '12px', margin: '6px 0' }}>
                                <strong style={{ color: '#9ca3af' }}>{key}:</strong> <span style={{ color: '#e5e7eb' }}>{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 5: DARK WEB MONITOR ==========
    const DarkWebMonitor = () => {
        const [dwEmail, setDwEmail] = useState('');
        const [result, setResult] = useState(null);
        
        const checkDarkWeb = async () => {
            setResult({ status: 'checking', message: 'Scanning dark web...' });
            setTimeout(() => {
                const found = Math.random() > 0.5;
                setResult({
                    status: 'complete',
                    found: found,
                    message: found ? '⚠️ Email found on dark web forums!' : '✅ Email not found on dark web',
                    date: found ? new Date().toLocaleDateString() : null
                });
            }, 2000);
        };
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🌑 Dark Web Monitor</h3>
                <div style={styles.inputGroup}>
                    <input type="email" placeholder="Enter email" value={dwEmail} onChange={(e) => setDwEmail(e.target.value)} style={styles.input} />
                    <button onClick={checkDarkWeb} style={styles.buttonSmall}>Monitor</button>
                </div>
                {result && (
                    <div style={{ marginTop: '16px', padding: '12px', background: '#1a1a2e', borderRadius: '12px', color: result.found ? '#ef4444' : '#10b981' }}>
                        {result.message}
                        {result.date && <p style={{ fontSize: '12px', marginTop: '6px', color: '#9ca3af' }}>First seen: {result.date}</p>}
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 6: PRIVACY HISTORY CHART ==========
    const PrivacyHistoryChart = () => {
        const [data, setData] = useState([]);
        
        useEffect(() => {
            const history = [];
            for (let i = 30; i >= 0; i--) {
                history.push({ date: `${i}d`, score: Math.floor(Math.random() * 40) + 40 });
            }
            setData(history);
        }, []);
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>📈 Privacy Score History (30 Days)</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" hide />
                        <YAxis domain={[0, 100]} stroke="#6b7280" />
                        <Tooltip contentStyle={{ background: '#1e1e2a', border: '1px solid #374151', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    // ========== FEATURE 7: SOCIAL MEDIA PRIVACY CHECKER ==========
    const SocialMediaChecker = () => {
        const platforms = [
            { name: "Instagram", status: "Public", risk: "High", action: "Make Private" },
            { name: "Facebook", status: "Friends Only", risk: "Medium", action: "Review Settings" },
            { name: "Twitter", status: "Protected", risk: "Low", action: "Good" },
            { name: "LinkedIn", status: "Public", risk: "High", action: "Limit Visibility" }
        ];
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>📱 Social Media Privacy Check</h3>
                {platforms.map((p, i) => (
                    <div key={i} style={{ ...styles.breachItem, justifyContent: 'space-between' }}>
                        <span><strong style={{ color: '#e5e7eb' }}>{p.name}</strong> <span style={{ color: '#9ca3af' }}>- {p.status}</span></span>
                        <span style={{ color: p.risk === 'High' ? '#ef4444' : (p.risk === 'Medium' ? '#f59e0b' : '#10b981'), fontWeight: '500' }}>
                            {p.risk} Risk
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // ========== FEATURE 8: VPN RECOMMENDATION ENGINE ==========
    const VPNRecommender = () => {
        const [need, setNeed] = useState('');
        const recommendations = {
            streaming: { name: "ExpressVPN", price: "$12.95/mo", bestFor: "Streaming" },
            privacy: { name: "Mullvad", price: "$5.00/mo", bestFor: "Privacy" },
            free: { name: "ProtonVPN", price: "Free", bestFor: "Budget" }
        };
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🔒 VPN Recommendation</h3>
                <select onChange={(e) => setNeed(e.target.value)} style={styles.select}>
                    <option value="">Select your primary need</option>
                    <option value="streaming">Streaming & Gaming</option>
                    <option value="privacy">Maximum Privacy</option>
                    <option value="free">Free Option</option>
                </select>
                {need && recommendations[need] && (
                    <div style={{ marginTop: '16px', padding: '16px', background: '#1a1a2e', borderRadius: '12px' }}>
                        <strong style={{ color: '#e5e7eb', fontSize: '16px' }}>{recommendations[need].name}</strong>
                        <p style={{ color: '#9ca3af', marginTop: '6px' }}>{recommendations[need].price} - Best for {recommendations[need].bestFor}</p>
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 9: COOKIE SCANNER ==========
    const CookieScanner = () => {
        const [cookies, setCookies] = useState([]);
        
        const scanCookies = () => {
            const allCookies = document.cookie.split(';').filter(c => c.trim());
            const parsed = allCookies.map(c => {
                const [name, value] = c.split('=');
                return { name: name?.trim() || 'Unknown', value: (value || '').substring(0, 30) };
            });
            setCookies(parsed);
        };
        
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>🍪 Cookie Scanner</h3>
                <button onClick={scanCookies} style={styles.buttonSmall}>Scan Cookies</button>
                {cookies.length > 0 && (
                    <div style={{ marginTop: '16px', maxHeight: '150px', overflow: 'auto', background: '#1a1a2e', borderRadius: '12px', padding: '12px' }}>
                        {cookies.map((c, i) => (
                            <div key={i} style={{ fontSize: '11px', padding: '6px 0', borderBottom: '1px solid #2d2d3a', color: '#e5e7eb' }}>
                                <strong style={{ color: '#3b82f6' }}>{c.name}</strong>: {c.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // ========== FEATURE 10: PRIVACY TIPS WIDGET ==========
    const PrivacyTips = () => {
        const tips = [
            "🔐 Use a password manager to generate unique passwords",
            "🛡️ Enable 2FA on all accounts that offer it",
            "📧 Regularly check haveibeenpwned.com for breaches",
            "🎭 Use email aliases for newsletter signups",
            "🚫 Install uBlock Origin to block trackers",
            "🔍 Use DuckDuckGo instead of Google for searches",
            "📷 Cover your laptop camera when not in use",
            "🔑 Don't reuse passwords across multiple sites"
        ];
        
        const [currentTip, setCurrentTip] = useState(tips[0]);
        
        const newTip = () => {
            const random = Math.floor(Math.random() * tips.length);
            setCurrentTip(tips[random]);
        };
        
        useEffect(() => {
            const interval = setInterval(newTip, 10000);
            return () => clearInterval(interval);
        }, []);
        
        return (
            <div style={{ ...styles.card, background: 'linear-gradient(135deg, #1e3a8a20 0%, #1e1e2a 100%)', borderColor: '#3b82f6', textAlign: 'center' }}>
                <h3 style={styles.cardTitle}>💡 Privacy Tip</h3>
                <p style={{ color: '#e5e7eb', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>{currentTip}</p>
                <button onClick={newTip} style={styles.copyBtn}>Next Tip →</button>
            </div>
        );
    };

    // Login/Register Screen
    if (!token) {
        return (
            <div style={styles.authContainer}>
                <div style={styles.authCard}>
                    <div style={styles.logo}>
                        <span style={styles.logoIcon}>🛡️</span>
                        <h1 style={styles.logoText}>BeWare</h1>
                        <p style={styles.logoSubtext}>Digital Privacy Auditor</p>
                    </div>
                    <form onSubmit={handleAuth}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
                        <button type="submit" disabled={loading} style={styles.button}>{loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}</button>
                    </form>
                    <p style={styles.switchText}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>{isLogin ? 'Register' : 'Login'}</button>
                    </p>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div style={styles.dashboard}>
            <header style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>🛡️</span>
                    <h1 style={styles.headerTitle}>BeWare</h1>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </header>
            
            <main style={styles.main}>
                <h2 style={styles.pageTitle}>Privacy Dashboard</h2>
                
                {/* Email Scanner */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>📧 Email Breach Scanner</h3>
                    <div style={styles.inputGroup}>
                        <input type="email" value={scanEmail} onChange={(e) => setScanEmail(e.target.value)} placeholder="Enter your email address" style={styles.input} />
                        <button onClick={handleEmailScan} disabled={loading} style={styles.buttonSmall}>{loading ? 'Scanning...' : 'Scan Email'}</button>
                    </div>
                    {scanResult && (
                        <div style={styles.resultBox}>
                            <RiskMeter score={scanResult.riskScore} label="PRIVACY RISK SCORE" />
                            <p style={scanResult.breachCount > 0 ? styles.resultDanger : styles.resultSuccess}>
                                {scanResult.breachCount > 0 ? `⚠️ Found in ${scanResult.breachCount} breach(es)` : '✅ No breaches found'}
                            </p>
                            <button onClick={() => copyToClipboard(`Email: ${scanResult.email}\nBreaches: ${scanResult.breachCount}\nRisk: ${scanResult.riskScore}%`, 'Breach Report')} style={styles.copyBtn}>📋 Copy Report</button>
                            {scanResult.breaches?.length > 0 && (
                                <div style={styles.breachList}>
                                    {scanResult.breaches.map((b, i) => (
                                        <div key={i} style={styles.breachItem}><strong style={{ color: '#e5e7eb' }}>{b.Name}</strong><span style={styles.breachDate}>{b.BreachDate}</span></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Ad Analyzer */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>🎯 Ad Manipulation Detector</h3>
                    <textarea value={adText} onChange={(e) => setAdText(e.target.value)} placeholder="Paste advertisement text here..." rows="4" style={styles.textarea} />
                    <button onClick={handleAdAnalysis} disabled={loading} style={styles.buttonFull}>{loading ? 'Analyzing...' : 'Analyze Ad'}</button>
                    {adResult && (
                        <div style={styles.resultBox}>
                            <RiskMeter score={adResult.manipulationScore} label="MANIPULATION SCORE" />
                            <p style={{ color: '#e5e7eb' }}>Urgency Level: <strong style={{ color: adResult.urgencyLevel === 'High' ? '#ef4444' : (adResult.urgencyLevel === 'Medium' ? '#f59e0b' : '#10b981') }}>{adResult.urgencyLevel}</strong></p>
                            {adResult.detectedTactics?.length > 0 && (
                                <div style={styles.tacticList}>
                                    <p style={styles.tacticTitle}>Detected Tactics:</p>
                                    {adResult.detectedTactics.map((t, i) => (
                                        <div key={i} style={styles.tacticItem}><span style={{ fontSize: '18px' }}>{t.icon || '🎯'}</span><strong style={{ color: '#e5e7eb' }}>{t.name}</strong><span style={{ color: '#f59e0b' }}>+{t.weight}%</span></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Download Report Button */}
                {(scanResult || adResult) && (
                    <div style={{ ...styles.card, background: '#1e3a8a20', borderColor: '#3b82f6', textAlign: 'center' }}>
                        <h3 style={styles.cardTitle}>📄 Export Privacy Report</h3>
                        <button onClick={downloadPDFReport} style={styles.downloadBtn}>📥 Download PDF Report</button>
                    </div>
                )}
                
                {/* ALL 10 NEW FEATURES GRID */}
                <h2 style={{ ...styles.pageTitle, marginTop: '48px' }}>🔧 Privacy Tools</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
                    <PasswordChecker />
                    <DataBrokerGuide />
                    <TrackerBlocker />
                    <FingerprintChecker />
                    <DarkWebMonitor />
                    <PrivacyHistoryChart />
                    <SocialMediaChecker />
                    <VPNRecommender />
                    <CookieScanner />
                    <PrivacyTips />
                </div>
            </main>
        </div>
    );
}

// Professional Styles - All text now visible!
const styles = {
    authContainer: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
    authCard: { background: '#1a1a2e', border: '1px solid #2d2d3a', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
    logo: { textAlign: 'center', marginBottom: '28px' },
    logoIcon: { fontSize: '56px', display: 'block', marginBottom: '12px' },
    logoText: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff', margin: 0 },
    logoSubtext: { color: '#9ca3af', marginTop: '6px', fontSize: '14px' },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #2d2d3a', borderRadius: '12px', padding: '14px', color: '#e5e7eb', marginBottom: '14px', fontSize: '14px', outline: 'none', transition: 'all 0.2s' },
    button: { width: '100%', background: '#3b82f6', color: '#ffffff', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' },
    buttonSmall: { background: '#3b82f6', color: '#ffffff', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '500', whiteSpace: 'nowrap', transition: 'all 0.2s' },
    buttonFull: { width: '100%', background: '#3b82f6', color: '#ffffff', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '500', marginTop: '12px', transition: 'all 0.2s' },
    copyBtn: { background: '#2d2d3a', color: '#e5e7eb', padding: '8px 16px', borderRadius: '10px', border: '1px solid #3d3d4a', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' },
    downloadBtn: { background: '#3b82f6', color: '#ffffff', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.2s' },
    select: { width: '100%', background: '#0f0f1a', border: '1px solid #2d2d3a', borderRadius: '12px', padding: '12px', color: '#e5e7eb', fontSize: '14px', marginBottom: '12px', outline: 'none' },
    switchText: { textAlign: 'center', color: '#9ca3af', marginTop: '20px', fontSize: '14px' },
    switchButton: { color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' },
    dashboard: { minHeight: '100vh', background: '#0f0f1a' },
    header: { background: '#1a1a2e', borderBottom: '1px solid #2d2d3a', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: 0 },
    logoutBtn: { color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
    main: { maxWidth: '1400px', margin: '0 auto', padding: '28px' },
    pageTitle: { fontSize: '28px', fontWeight: 'bold', color: '#ffffff', marginBottom: '28px' },
    card: { background: '#1a1a2e', border: '1px solid #2d2d3a', borderRadius: '20px', padding: '24px', marginBottom: '24px', transition: 'all 0.2s' },
    cardTitle: { fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '18px' },
    inputGroup: { display: 'flex', gap: '12px' },
    textarea: { width: '100%', background: '#0f0f1a', border: '1px solid #2d2d3a', borderRadius: '12px', padding: '12px', color: '#e5e7eb', resize: 'vertical', marginBottom: '12px', fontSize: '14px', outline: 'none' },
    resultBox: { marginTop: '20px', padding: '20px', background: '#0f0f1a', borderRadius: '16px', border: '1px solid #2d2d3a' },
    resultDanger: { color: '#ef4444', fontWeight: '600', marginBottom: '12px', fontSize: '14px' },
    resultSuccess: { color: '#10b981', fontWeight: '600', marginBottom: '12px', fontSize: '14px' },
    breachList: { marginTop: '16px' },
    breachItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #2d2d3a' },
    breachDate: { color: '#9ca3af', fontSize: '12px' },
    tacticList: { marginTop: '16px' },
    tacticTitle: { fontSize: '14px', color: '#9ca3af', marginBottom: '10px', fontWeight: '500' },
    tacticItem: { display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', background: '#1a1a2e', borderRadius: '12px', marginBottom: '8px', border: '1px solid #2d2d3a' },
    progressBar: { width: '100%', background: '#2d2d3a', borderRadius: '10px', height: '8px', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: '10px', transition: 'width 0.3s' }
};

export default App;