export default function UrlAnalyzer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-sm font-medium text-blue-700">
              Link Security
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            URL Analyzer
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto">
            Paste a website link to understand whether it looks safe or suspicious.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>

            <div className="relative">
              <input
                type="url"
                aria-label="Website URL"
                placeholder="https://example.com"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                We check the link in real-time
              </span>
              <span className="text-xs text-gray-400">
                HTTPS / HTTP URLs only
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Analyze URL
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">
              Security Report
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Results Placeholder */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 text-center">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Waiting for URL
            </h3>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Enter a URL above to check for phishing attempts, malware, and other security risks.
            </p>
          </div>

          {/* Checks */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              We'll check for:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Phishing", "Malware", "SSL/TLS", "Reputation"].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
                >
                  <span className="text-blue-600 font-semibold text-xs">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
