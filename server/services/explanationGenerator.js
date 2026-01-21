
const generateExplanation = (riskLevel, checks, type) => {
    const status = riskLevel === 'High' ? 'harmful' : riskLevel === 'Medium' ? 'suspicious' : 'safe';

    if (riskLevel === 'Low') {
        return `This ${type} appears safe as no significant threats were detected.`;
    }

    // Find the first failed check to use as the primary reason
    const failedCheck = checks.find(check =>
        check.result === 'Detected' ||
        check.result === 'Found' ||
        check.result === 'Risk Found'
    );

    let reason = 'potential risks were identified';
    if (failedCheck) {
        switch (failedCheck.name) {
            // URL Checks
            case 'Suspicious Keywords':
                reason = 'it contains keywords often used in phishing attacks';
                break;
            case 'URL Shortener':
                reason = 'it uses a link shortener to hide the true destination';
                break;
            case 'IP Address Host':
                reason = 'it uses a raw IP address instead of a trusted domain name';
                break;
            case 'Excessive Subdomains':
                reason = 'it uses multiple subdomains to mimic legitimate sites';
                break;
            case 'High Risk TLD':
                reason = 'it uses a domain ending commonly associated with spam';
                break;

            // Message Checks
            case 'Scam Keywords':
                reason = 'it contains words commonly used in scams';
                break;
            case 'Impersonation':
                reason = 'it attempts to impersonate a known organization';
                break;
            case 'Urgency':
                reason = 'it creates artificial urgency to trick users';
                break;
            case 'Linked URL Analysis':
                reason = 'it contains a link to a potentially unsafe website';
                break;

            // Identity Checks
            case 'Disposable Email':
                reason = 'it uses a temporary email service often used for fraud';
                break;
            case 'Suspicious Email Pattern':
                reason = 'the email format looks machine-generated';
                break;
            case 'Suspicious Username':
                reason = 'the username mimics an official account';
                break;

            default:
                reason = failedCheck.details ? failedCheck.details.toLowerCase().replace(/\.$/, '') : 'potential risks were identified';
        }
    }

    return `This ${type} is ${status} because ${reason}.`;
};

module.exports = { generateExplanation };
