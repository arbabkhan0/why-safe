// Mock data for demonstration purposes
const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'mailinator.com'];

const { generateExplanation } = require('./explanationGenerator');

exports.checkIdentity = (email, username) => {
  let riskScore = 0;
  const checks = [];
  let riskLevel = 'Low';

  // 1. Email Analysis
  if (email) {
    const domain = email.split('@')[1];

    // Disposable Domain Check
    if (disposableDomains.includes(domain)) {
      riskScore += 50;
      checks.push({ name: 'Disposable Email', result: 'Detected', details: 'Email provider is known for temporary addresses.' });
    } else {
      checks.push({ name: 'Disposable Email', result: 'Clean' });
    }

    // Pattern Check
    const localPart = email.split('@')[0];
    if (localPart.length > 20 && /\d{4,}/.test(localPart)) {
      riskScore += 20;
      checks.push({ name: 'Suspicious Email Pattern', result: 'Detected', details: 'Email format looks machine-generated.' });
    }
  }

  // 2. Username Analysis
  if (username) {
    // Check for common scam patterns
    const suspiciousUsernames = ['admin', 'support', 'official', 'billing', 'security', 'verification'];
    if (suspiciousUsernames.some(keyword => username.toLowerCase().includes(keyword))) {
      riskScore += 30;
      checks.push({ name: 'Suspicious Username', result: 'Detected', details: 'Username contains keywords often used for impersonation.' });
    } else {
      checks.push({ name: 'Suspicious Username', result: 'Clean' });
    }
  }

  // Determine Risk Level
  if (riskScore >= 61) riskLevel = 'High';
  else if (riskScore >= 31) riskLevel = 'Medium';

  const explanation = generateExplanation(riskLevel, checks, 'identity');

  return {
    email,
    username,
    riskScore: Math.min(riskScore, 100),
    riskLevel,
    explanation,
    checks
  };
};
