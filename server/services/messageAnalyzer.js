const urlAnalyzer = require('./urlAnalyzer');
const { generateExplanation } = require('./explanationGenerator');

const scamKeywords = ['urgent', 'winner', 'prize', 'lottery', 'bank', 'verify', 'otp', 'password', 'expire', 'suspended', 'activity', 'refund', 'unusual sign-in'];
const impersonationPhrases = ['your bank', 'irs', 'amazon support', 'microsoft support', 'tech support', 'delivery', 'postal service'];

exports.analyzeMessage = (text, type) => {
  let riskScore = 0;
  const checks = [];
  let riskLevel = 'Low';

  const lowerText = text.toLowerCase();

  // 1. Keyword Analysis
  const foundKeywords = scamKeywords.filter(keyword => lowerText.includes(keyword));
  if (foundKeywords.length > 0) {
    riskScore += 10 * foundKeywords.length;
    checks.push({ name: 'Scam Keywords', result: 'Found', details: foundKeywords.join(', ') });
  }

  // 2. Impersonation Check
  const foundPhrases = impersonationPhrases.filter(phrase => lowerText.includes(phrase));
  if (foundPhrases.length > 0) {
    riskScore += 20 * foundPhrases.length;
    checks.push({ name: 'Impersonation', result: 'Detected', details: foundPhrases.join(', ') });
  }

  // 3. Urgency Check
  if (/urgent|immediately|now|today|24 hours|action required/.test(lowerText)) {
    riskScore += 15;
    checks.push({ name: 'Urgency', result: 'Detected', details: 'Message creates artificial urgency.' });
  }

  // 4. URL Extraction & Analysis
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const urls = text.match(urlRegex);
  let urlRisk = 0;

  if (urls) {
    urls.forEach(url => {
      const urlAnalysis = urlAnalyzer.analyzeUrl(url);
      if (urlAnalysis.riskScore > 0) {
        urlRisk = Math.max(urlRisk, urlAnalysis.riskScore);
        checks.push({ name: `Linked URL Analysis`, result: 'Risk Found', details: `URL: ${url} has risk score ${urlAnalysis.riskScore}` });
      }
    });
    riskScore += urlRisk;
  }

  // Determine Risk Level
  if (riskScore >= 61) riskLevel = 'High';
  else if (riskScore >= 31) riskLevel = 'Medium';

  const explanation = generateExplanation(riskLevel, checks, 'message');

  return {
    text,
    type,
    riskScore: Math.min(riskScore, 100),
    riskLevel,
    explanation,
    checks
  };
};
