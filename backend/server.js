const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();

// In-memory storage
const users = new Map();
let nextUserId = 1;

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Middleware
app.use(cors());
app.use(express.json());

// ============ HEALTH CHECK (FIXED) ============
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'BeWare Backend Running', timestamp: new Date().toISOString() });
});

// ============ ROOT ENDPOINT ============
app.get('/', (req, res) => {
    res.json({ 
        message: 'BeWare Backend API', 
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            scanEmail: 'POST /api/scan/email',
            scanAd: 'POST /api/scan/ad'
        }
    });
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

// ============ SCAN ROUTES ============

// Email Breach Scanner (Deterministic - same email = same results)
app.post('/api/scan/email', (req, res) => {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }
    
    const allBreaches = [
        { Name: "LinkedIn", BreachDate: "2021-06-22", PwnCount: "700M", Description: "Email and password hashes exposed" },
        { Name: "Adobe", BreachDate: "2013-10-04", PwnCount: "153M", Description: "Email and encrypted passwords" },
        { Name: "Canva", BreachDate: "2019-05-24", PwnCount: "137M", Description: "Email addresses and names" },
        { Name: "Dropbox", BreachDate: "2016-08-01", PwnCount: "68M", Description: "Hashed passwords" },
        { Name: "MyFitnessPal", BreachDate: "2018-03-01", PwnCount: "150M", Description: "Email and hashed passwords" }
    ];
    
    // Deterministic: same email always gets same results
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const hashValue = parseInt(hash.substring(0, 8), 16);
    const breachCount = hashValue % 5; // 0-4 breaches
    const breaches = allBreaches.slice(0, breachCount);
    const riskScore = breachCount * 20;
    
    let riskLevel = 'Low';
    if (riskScore >= 70) riskLevel = 'Critical';
    else if (riskScore >= 40) riskLevel = 'High';
    else if (riskScore >= 20) riskLevel = 'Medium';
    
    res.json({
        email,
        breachCount,
        riskScore: Math.min(riskScore, 100),
        riskLevel,
        breaches,
        scannedAt: new Date().toISOString()
    });
});

// Ad Manipulation Analyzer
app.post('/api/scan/ad', (req, res) => {
    const { adText } = req.body;
    
    if (!adText || adText.trim().length === 0) {
        return res.status(400).json({ error: 'Ad text required' });
    }
    
    const tacticsLibrary = [
        { keywords: ['limited', 'only', 'left', 'stock', 'sold out', 'last chance', 'hurry'], name: 'Scarcity & Urgency', icon: '⏰', weight: 25, description: 'Creates fear of missing out' },
        { keywords: ['review', 'rating', 'customers say', 'bestseller', 'trending', 'popular'], name: 'Social Proof', icon: '👥', weight: 20, description: 'Uses herd mentality' },
        { keywords: ['you deserve', 'treat yourself', 'special', 'exclusive', 'premium'], name: 'Flattery', icon: '💎', weight: 15, description: 'Appeals to ego' },
        { keywords: ['save', 'discount', 'deal', 'offer', 'free shipping', '% off'], name: 'Loss Aversion', icon: '💰', weight: 20, description: 'Focuses on what you lose' },
        { keywords: ['emergency', 'warning', 'alert', 'act now'], name: 'Fear-Based', icon: '😨', weight: 30, description: 'Uses negative emotions' },
        { keywords: ['sale ends', 'midnight', 'today only', 'flash sale', 'hours left'], name: 'Time Pressure', icon: '⏱️', weight: 25, description: 'Artificial deadlines' }
    ];
    
    const lowerText = adText.toLowerCase();
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
    
    res.json({
        manipulationScore: totalScore,
        urgencyLevel,
        detectedTactics,
        tacticCount: detectedTactics.length,
        analyzedAt: new Date().toISOString()
    });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🛡️  BEWARE BACKEND - DEPLOYED ON RENDER                ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   🚀 Server: http://localhost:${PORT}                      ║git add backend/server.js

║   ✅ Health: http://localhost:${PORT}/health               ║
║   🔐 Auth:  http://localhost:${PORT}/api/auth             ║
║   📡 Scan:  http://localhost:${PORT}/api/scan             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;