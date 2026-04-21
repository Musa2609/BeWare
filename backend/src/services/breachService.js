const crypto = require('crypto');

// Deterministic demo data (same email = same results)
const getDeterministicBreaches = (email) => {
    // Create a hash of the email to get consistent results
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const hashValue = parseInt(hash.substring(0, 8), 16);
    
    const allBreaches = [
        { Name: "LinkedIn", BreachDate: "2021-06-22", PwnCount: "700M", Description: "Email and password hashes exposed" },
        { Name: "Adobe", BreachDate: "2013-10-04", PwnCount: "153M", Description: "Email and encrypted passwords" },
        { Name: "Canva", BreachDate: "2019-05-24", PwnCount: "137M", Description: "Email addresses and names" },
        { Name: "Dropbox", BreachDate: "2016-08-01", PwnCount: "68M", Description: "Hashed passwords" },
        { Name: "MyFitnessPal", BreachDate: "2018-03-01", PwnCount: "150M", Description: "Email and hashed passwords" },
        { Name: "Twitter", BreachDate: "2022-11-01", PwnCount: "5.4M", Description: "Email and phone numbers" },
        { Name: "Facebook", BreachDate: "2019-12-01", PwnCount: "267M", Description: "User IDs and phone numbers" },
        { Name: "Marriott", BreachDate: "2018-11-30", PwnCount: "383M", Description: "Guest records" }
    ];
    
    // Deterministic: same email always gets same number of breaches
    const breachCount = (hashValue % 5); // 0-4 breaches
    const breaches = allBreaches.slice(0, breachCount);
    
    return breaches;
};

// REAL API call to HaveIBeenPwned
const checkRealBreaches = async (email) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(`${process.env.HIBP_API_URL}/breachedaccount/${encodeURIComponent(email)}`, {
            headers: {
                'hibp-api-key': '', // Free tier doesn't require key
                'User-Agent': 'BeWare-App/1.0'
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.status === 200) {
            const breaches = await response.json();
            return { breaches, isDemo: false };
        } else if (response.status === 404) {
            return { breaches: [], isDemo: false };
        } else {
            throw new Error(`API returned ${response.status}`);
        }
    } catch (error) {
        console.log('API fallback to demo data:', error.message);
        const breaches = getDeterministicBreaches(email);
        return { breaches, isDemo: true };
    }
};

const checkEmailBreaches = async (email) => {
    // Use real API first
    const { breaches, isDemo } = await checkRealBreaches(email);
    
    const breachCount = breaches.length;
    const riskScore = Math.min(breachCount * 20, 100);
    let riskLevel = 'Low';
    if (riskScore >= 70) riskLevel = 'Critical';
    else if (riskScore >= 40) riskLevel = 'High';
    else if (riskScore >= 20) riskLevel = 'Medium';
    
    return {
        breaches,
        breachCount,
        riskScore,
        riskLevel,
        isDemo
    };
};

module.exports = { checkEmailBreaches, getDeterministicBreaches };