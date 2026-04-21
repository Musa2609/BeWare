const TACTICS_DB = [
    { keywords: ['limited', 'only', 'left', 'stock', 'sold out', 'last chance', 'hurry', 'running out'], name: 'Scarcity & Urgency', icon: '⏰', weight: 25, explanation: 'Creates fear of missing out' },
    { keywords: ['review', 'rating', 'customers say', 'bestseller', 'trending', 'popular', 'top rated'], name: 'Social Proof', icon: '👥', weight: 20, explanation: 'Uses herd mentality' },
    { keywords: ['you deserve', 'treat yourself', 'special', 'exclusive', 'premium', 'luxury'], name: 'Flattery', icon: '💎', weight: 15, explanation: 'Appeals to ego' },
    { keywords: ['save', 'discount', 'deal', 'offer', 'free shipping', '% off', 'bogo', 'clearance'], name: 'Loss Aversion', icon: '💰', weight: 20, explanation: 'Focuses on what you lose' },
    { keywords: ['emergency', 'warning', 'alert', 'act now', 'urgent', 'critical'], name: 'Fear-Based', icon: '😨', weight: 30, explanation: 'Uses negative emotions' },
    { keywords: ['sale ends', 'midnight', 'today only', 'flash sale', 'hours left', 'deadline'], name: 'Time Pressure', icon: '⏱️', weight: 25, explanation: 'Artificial deadlines' }
];

const analyzeAdText = (text) => {
    const lowerText = text.toLowerCase();
    const detectedTactics = [];
    let totalScore = 0;
    
    TACTICS_DB.forEach(tactic => {
        const found = tactic.keywords.some(keyword => lowerText.includes(keyword));
        if (found) {
            detectedTactics.push({
                name: tactic.name,
                weight: tactic.weight,
                explanation: tactic.explanation,
                icon: tactic.icon
            });
            totalScore += tactic.weight;
        }
    });
    
    totalScore = Math.min(totalScore, 100);
    
    let urgencyLevel = 'Low';
    if (totalScore >= 60) urgencyLevel = 'High';
    else if (totalScore >= 30) urgencyLevel = 'Medium';
    
    return {
        score: totalScore,
        urgencyLevel,
        tactics: detectedTactics,
        tacticCount: detectedTactics.length,
        analyzedAt: new Date().toISOString()
    };
};

module.exports = { analyzeAdText };