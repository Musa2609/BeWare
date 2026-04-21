const { query } = require('../utils/database');
const { checkEmailBreaches } = require('../services/breachService');
const { analyzeAdText } = require('../services/adAnalyzerService');

const scanEmail = async (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }
    
    try {
        const result = await checkEmailBreaches(email);
        
        // Store in database
        await query(
            `INSERT INTO scan_history (user_id, scan_type, target, result_data, risk_score, created_at) 
             VALUES ($1, $2, $3, $4, $5, NOW())`,
            [userId, 'email_breach', email, JSON.stringify(result.breaches), result.riskScore]
        );
        
        res.json({
            email,
            breachCount: result.breachCount,
            riskScore: result.riskScore,
            riskLevel: result.riskLevel,
            breaches: result.breaches.slice(0, 10),
            isDemo: result.isDemo || false,
            scannedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Email scan error:', error);
        res.status(500).json({ error: 'Scan failed' });
    }
};

const analyzeAd = async (req, res) => {
    const { adText } = req.body;
    const userId = req.user.id;
    
    if (!adText || adText.trim().length === 0) {
        return res.status(400).json({ error: 'Ad text required' });
    }
    
    try {
        const analysis = analyzeAdText(adText);
        
        // Store in database
        await query(
            `INSERT INTO scan_history (user_id, scan_type, target, result_data, risk_score, created_at) 
             VALUES ($1, $2, $3, $4, $5, NOW())`,
            [userId, 'ad_analysis', adText.substring(0, 100), JSON.stringify(analysis.tactics), analysis.score]
        );
        
        res.json(analysis);
    } catch (error) {
        console.error('Ad analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
};

const getScanHistory = async (req, res) => {
    const userId = req.user.id;
    const { limit = 20 } = req.query;
    
    try {
        const result = await query(
            `SELECT scan_type, target, risk_score, created_at, result_data 
             FROM scan_history WHERE user_id = $1 
             ORDER BY created_at DESC LIMIT $2`,
            [userId, parseInt(limit)]
        );
        
        res.json({ history: result.rows });
    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

module.exports = { scanEmail, analyzeAd, getScanHistory };