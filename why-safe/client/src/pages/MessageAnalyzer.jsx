export default function MessageAnalyzer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 bg-purple-100 rounded-full">
            <span className="text-sm font-medium text-purple-700">
              Message Security
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Message Analyzer
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto">
            Paste a suspicious SMS, email, or WhatsApp message to analyze its intent.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suspicious Message
            </label>

            <textarea
              rows="6"
              maxLength={2000}
              aria-label="Suspicious message input"
              placeholder="Paste the message here... Example: 'Urgent! Your account has been compromised. Click here to secure it: suspicious-link.com'"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                We never store or log your messages
              </span>
              <span className="text-xs text-gray-400">
                Max 2000 characters
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Analyze Message
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">
              Analysis Results
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Results Placeholder */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 border border-gray-200 rounded-xl p-6 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Message Analyzed Yet
            </h3>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Paste a suspicious message above to check for scams, phishing attempts, and malicious intent.
            </p>
          </div>

          {/* Message Types */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
              <div className="text-blue-600 font-semibold text-sm mb-1">
                SMS
              </div>
              <div className="text-xs text-blue-700">
                Detect scam texts
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
              <div className="text-purple-600 font-semibold text-sm mb-1">
                Email
              </div>
              <div className="text-xs text-purple-700">
                Spot phishing emails
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-100 rounded-lg p-3 text-center">
              <div className="text-pink-600 font-semibold text-sm mb-1">
                WhatsApp
              </div>
              <div className="text-xs text-pink-700">
                Identify fraud messages
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
