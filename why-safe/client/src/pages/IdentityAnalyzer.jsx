import { useState } from 'react';
import { checkIdentity } from '../services/api';

export default function IdentityAnalyzer() {
  const [identity, setIdentity] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!identity) return;
    setAnalyzing(true);
    setError('');
    setResult(null);

    // Simple heuristic to distinguish email from username
    const isEmail = identity.includes('@');
    const email = isEmail ? identity : null;
    const username = !isEmail ? identity : null;

    try {
      const data = await checkIdentity(email, username);
      setResult(data);
    } catch (err) {
      setError(err.error || 'Failed to check identity');
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === 'High') return 'text-brand-danger bg-brand-danger/10';
    if (level === 'Medium') return 'text-brand-warning bg-brand-warning/10';
    return 'text-brand-success bg-brand-success/10';
  };

  return (
    <div className="min-h-screen bg-brand-bg px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 bg-brand-primary/10 rounded-full">
            <span className="text-sm font-medium text-brand-primary">
              Identity Verification
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary mb-3">
            Identity Checker
          </h1>

          <p className="text-brand-text-secondary max-w-lg mx-auto">
            Enter an email or username to understand potential exposure risks.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-brand-card rounded-2xl shadow-lg border border-brand-border p-6 sm:p-8">
          
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-text-primary mb-2">
              Email or Username
            </label>

            <input
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              aria-label="Email or Username"
              placeholder="example@email.com or username"
              className="w-full px-4 py-3 bg-brand-bg text-brand-text-primary placeholder-brand-text-secondary border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !identity}
            className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {analyzing ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                </>
            ) : (
                'Check Identity'
            )}
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-brand-border"></div>
            <span className="px-4 text-sm text-brand-text-secondary">
              Results
            </span>
            <div className="flex-1 border-t border-brand-border"></div>
          </div>

          {/* Results Area */}
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-brand-card rounded-xl border border-brand-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-brand-text-primary">Risk Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel}
                    </span>
                </div>

                {/* Explanation Box */}
                {result.explanation && (
                    <div className={`mb-6 p-4 rounded-lg border ${
                        result.riskLevel === 'High' ? 'bg-brand-danger/10 border-brand-danger/20 text-brand-danger' :
                        result.riskLevel === 'Medium' ? 'bg-brand-warning/10 border-brand-warning/20 text-brand-warning' :
                        'bg-brand-success/10 border-brand-success/20 text-brand-success'
                    }`}>
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium">
                                {result.explanation}
                            </p>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <span className="font-semibold text-brand-text-primary">Risk Score:</span>
                    <div className="w-full bg-brand-border rounded-full h-2.5 mt-1">
                    <div 
                        className={`h-2.5 rounded-full ${result.riskLevel === 'High' ? 'bg-brand-danger' : result.riskLevel === 'Medium' ? 'bg-brand-warning' : 'bg-brand-success'}`} 
                        style={{ width: `${result.riskScore}%` }}
                    ></div>
                    </div>
                    <div className="text-right text-xs text-brand-text-secondary mt-1">{result.riskScore}/100</div>
                </div>

                <div className="space-y-3">
                    {result.checks.map((check, index) => (
                    <div key={index} className="flex justify-between items-start text-sm">
                        <span className="text-brand-text-secondary">{check.name}</span>
                        <div className="text-right">
                            <span className={`font-medium ${check.result === 'Clean' ? 'text-brand-success' : 'text-brand-danger'}`}>
                                {check.result}
                            </span>
                            {check.details && (
                                <p className="text-xs text-brand-text-secondary mt-1 max-w-[200px]">{check.details}</p>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          ) : (
            <div className="bg-brand-bg border border-dashed border-brand-border rounded-xl p-6 text-center">
                <svg
                className="w-12 h-12 mx-auto text-brand-text-secondary mb-3 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                </svg>

                <h3 className="text-lg font-semibold text-brand-text-primary mb-2">
                Ready to Analyze
                </h3>

                <p className="text-brand-text-secondary text-sm">
                Enter an email or username above to see exposure risks and security insights.
                </p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-brand-danger/10 text-brand-danger rounded-xl text-center">
                {error}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-brand-primary mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm text-brand-primary">
                We check for data breaches, phishing risks, and public exposure — without storing your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
