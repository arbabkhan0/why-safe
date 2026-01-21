const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'banking', 'paypal', 'google', 'apple', 'microsoft'];
const urlShorteners = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'is.gd', 'buff.ly', 'ow.ly'];
const { generateExplanation } = require('./explanationGenerator');

exports.analyzeUrl = (url) => {
  let riskScore = 0;
  const checks = [];
  let riskLevel = 'Low';

  try {
    // Add protocol if missing for URL parsing
    let parseUrl = url;
    if (!url.startsWith('http')) {
      parseUrl = 'http://' + url;
    }

    const urlObj = new URL(parseUrl);
    const domain = urlObj.hostname;

    // 1. Keyword Check
    const foundKeywords = suspiciousKeywords.filter(keyword => url.toLowerCase().includes(keyword));
    if (foundKeywords.length > 0) {
      riskScore += 10 * foundKeywords.length;
      checks.push({ name: 'Suspicious Keywords', result: 'Found', details: foundKeywords.join(', ') });
    } else {
      checks.push({ name: 'Suspicious Keywords', result: 'Clean' });
    }

    // 2. URL Shortener Check
    if (urlShorteners.some(shortener => domain.includes(shortener))) {
      riskScore += 15;
      checks.push({ name: 'URL Shortener', result: 'Detected', details: 'Shortened URLs hide the true destination.' });
    }

    // 3. IP Address Check
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(domain)) {
      riskScore += 25;
      checks.push({ name: 'IP Address Host', result: 'Detected', details: 'Using IP address instead of domain name is suspicious.' });
    }

    // 4. Subdomain Check
    const subdomains = domain.split('.');
    if (subdomains.length > 3) {
      riskScore += 10;
      checks.push({ name: 'Excessive Subdomains', result: 'Detected', details: 'Multiple subdomains can be used to hide real domain.' });
    }

    // 5. TLD Check
    const riskyTLDs = ['.xyz', '.top', '.club', '.info', '.site'];
    if (riskyTLDs.some(tld => domain.endsWith(tld))) {
      riskScore += 10;
      checks.push({ name: 'High Risk TLD', result: 'Detected', details: 'Domain uses a TLD commonly associated with spam.' });
    }

    // Determine Risk Level
    if (riskScore >= 61) riskLevel = 'High';
    else if (riskScore >= 31) riskLevel = 'Medium';

  } catch (error) {
    return { error: 'Invalid URL format' };
  }

  const explanation = generateExplanation(riskLevel, checks, 'link');

  return {
    url,
    riskScore: Math.min(riskScore, 100), // Cap at 100
    riskLevel,
    explanation,
    checks
  };
};
