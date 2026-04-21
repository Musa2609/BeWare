const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

dotenv.config();

const app = express();

// In-memory storage (works without PostgreSQL)
const users = new Map(); // email -> { passwordHash, id, createdAt }
const scanHistory = new Map(); // userId -> array of scans
let nextUserId = 1;

// Simple password hashing (for demo)
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), message: 'BeWare Backend Running' });
});

// ============ AUTH ROUTES ============

// Register
app.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const lowerEmail = email.toLowerCase();
    
    if (users.has(lowerEmail)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const userId = nextUserId++;
    users.set(lowerEmail, {
        id: userId,
        email: lowerEmail,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString()
    });
    scanHistory.set(userId, []);
    
    const token = Buffer.from(`${userId}:${lowerEmail}:${Date.now()}`).toString('base64');
    
    res.status(201).json({
        message: 'User registered successfully',
        user: { id: userId, email: lowerEmail },
        token
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    
    const lowerEmail = email.toLowerCase();
    const user = users.get(lowerEmail);
    
    if (!user || user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');
    
    res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email },
        token
    });
});

// ============ DETERMINISTIC BREACH DATA (Same email = same results) ============

const getDeterministicBreaches = (email) => {
    // Create a hash of the email for consistent results
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const hashValue = parseInt(hash.substring(0, 8), 16);
    
    const allBreaches = [
        { Name: "LinkedIn", BreachDate: "2021-06-22", PwnCount: "700M", Description: "Email and password hashes exposed" },
        { Name: "Adobe", BreachDate: "2013-10-04", PwnCount: "153M", Description: "Email and encrypted passwords" },
        { Name: "Canva", BreachDate: "2019-05-24", PwnCount: "137M", Description: "Email addresses and names" },
        { Name: "Dropbox", BreachDate: "2016-08-01", PwnCount: "68M", Description: "Hashed passwords" },
        { Name: "MyFitnessPal", BreachDate: "2018-03-01", PwnCount: "150M", Description: "Email and hashed passwords" },
        { Name: "Twitter", BreachDate: "2022-11-01", PwnCount: "5.4M", Description: "Email and phone numbers" }
    ];
    
    // Deterministic: same email always gets same number of breaches (0-4)
    const breachCount = hashValue % 5;
    const breaches = allBreaches.slice(0, breachCount);
    
    return breaches;
};

// ============ SCAN ROUTES ============

// Auth middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Please login.' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = Buffer.from(token, 'base64').toString();
        const [userId, email] = decoded.split(':');
        req.user = { id: parseInt(userId), email };
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

// Email Breach Scanner (Deterministic - Same email = Same results)
app.post('/api/scan/email', authMiddleware, (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }
    
    const breaches = getDeterministicBreaches(email);
    const breachCount = breaches.length;
    const riskScore = Math.min(breachCount * 20, 100);
    
    let riskLevel = 'Low';
    if (riskScore >= 70) riskLevel = 'Critical';
    else if (riskScore >= 40) riskLevel = 'High';
    else if (riskScore >= 20) riskLevel = 'Medium';
    
    // Store in memory
    const userScans = scanHistory.get(userId) || [];
    userScans.push({
        type: 'email_breach',
        email,
        breachCount,
        riskScore,
        timestamp: new Date().toISOString()
    });
    scanHistory.set(userId, userScans);
    
    res.json({
        email,
        breachCount,
        riskScore,
        riskLevel,
        breaches,
        isDemo: true,
        scannedAt: new Date().toISOString()
    });
});

// Ad Manipulation Analyzer
app.post('/api/scan/ad', authMiddleware, (req, res) => {
    const { adText } = req.body;
    const userId = req.user.id;
    
    if (!adText || adText.trim().length === 0) {
        return res.status(400).json({ error: 'Ad text required' });
    }
    
    const lowerText = adText.toLowerCase();
    
    const tacticsLibrary = [
        { keywords: ['limited', 'only', 'left', 'stock', 'sold out', 'last chance', 'hurry'], name: 'Scarcity & Urgency', icon: '⏰', weight: 25, description: 'Creates fear of missing out' },
        { keywords: ['review', 'rating', 'customers say', 'bestseller', 'trending'], name: 'Social Proof', icon: '👥', weight: 20, description: 'Uses herd mentality' },
        { keywords: ['you deserve', 'treat yourself', 'exclusive', 'premium'], name: 'Flattery', icon: '💎', weight: 15, description: 'Appeals to ego' },
        { keywords: ['save', 'discount', 'deal', 'offer', 'free shipping'], name: 'Loss Aversion', icon: '💰', weight: 20, description: 'Focuses on what you lose' },
        { keywords: ['emergency', 'warning', 'alert', 'act now'], name: 'Fear-Based', icon: '😨', weight: 30, description: 'Uses negative emotions' },
        { keywords: ['today only', 'flash sale', 'hours left', 'sale ends'], name: 'Time Pressure', icon: '⏱️', weight: 25, description: 'Artificial deadlines' }
    ];
    
    const detectedTactics = [];
    let totalScore = 0;
    
    tacticsLibrary.forEach(tactic => {
        const found = tactic.keywords.some(keyword => lowerText.includes(keyword));
        if (found) {
            detectedTactics.push({ 
                name: tactic.name, 
                icon: tactic.icon, 
                weight: tactic.weight,
                description: tactic.description 
            });
            totalScore += tactic.weight;
        }
    });
    
    totalScore = Math.min(totalScore, 100);
    
    let urgencyLevel = 'Low';
    if (totalScore >= 60) urgencyLevel = 'High';
    else if (totalScore >= 30) urgencyLevel = 'Medium';
    
    // Store in memory
    const userScans = scanHistory.get(userId) || [];
    userScans.push({
        type: 'ad_analysis',
        text: adText.substring(0, 100),
        score: totalScore,
        tactics: detectedTactics.length,
        timestamp: new Date().toISOString()
    });
    scanHistory.set(userId, userScans);
    
    res.json({
        manipulationScore: totalScore,
        urgencyLevel,
        detectedTactics,
        tacticCount: detectedTactics.length,
        analyzedAt: new Date().toISOString()
    });
});

// Get scan history
app.get('/api/scan/history', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const history = scanHistory.get(userId) || [];
    res.json({ history: history.slice(-20) }); // Last 20 scans
});

// Get user stats
app.get('/api/analytics/stats', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const history = scanHistory.get(userId) || [];
    
    const emailScans = history.filter(h => h.type === 'email_breach');
    const adScans = history.filter(h => h.type === 'ad_analysis');
    
    const avgRisk = emailScans.length > 0 
        ? emailScans.reduce((sum, s) => sum + (s.riskScore || 0), 0) / emailScans.length 
        : 0;
    
    res.json({
        totalScans: history.length,
        emailScans: emailScans.length,
        adScans: adScans.length,
        averageRiskScore: Math.round(avgRisk),
        lastScanDate: history[0]?.timestamp || null
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🛡️  BEWARE BACKEND - NO DATABASE MODE                  ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   🚀 Server: http://localhost:${PORT}                      ║
║   ✅ Health: http://localhost:${PORT}/health               ║
║   🔐 Auth:  http://localhost:${PORT}/api/auth             ║
║   📡 Scan:  http://localhost:${PORT}/api/scan             ║
║                                                           ║
║   📊 Storage: In-Memory (No PostgreSQL needed)            ║
║   🔑 JWT Auth: Enabled (Simple Token)                     ║
║   🎯 Demo Mode: Deterministic breach data                 ║
║                                                           ║
║   ✅ Perfect for Hackathon Demo!                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;