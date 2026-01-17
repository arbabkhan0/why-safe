export default function IdentityAnalyzer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-sm font-medium text-blue-700">
              Identity Verification
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Identity Checker
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto">
            Enter an email or username to understand potential exposure risks.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Username
            </label>

            <input
              type="text"
              aria-label="Email or Username"
              placeholder="example@email.com or username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Check Identity
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">
              Results
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Results Placeholder */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-3"
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

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ready to Analyze
            </h3>

            <p className="text-gray-500 text-sm">
              Enter an email or username above to see exposure risks and security insights.
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm text-blue-700">
                We check for data breaches, phishing risks, and public exposure — without storing your data.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

