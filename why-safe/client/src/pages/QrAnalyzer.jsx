export default function QrAnalyzer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3 px-3 py-1 bg-orange-100 rounded-full">
            <span className="text-sm font-medium text-orange-700">
              QR Code Security
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            QR Code Analyzer
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto">
            Upload a QR code to preview and analyze its destination safely.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* Upload Area */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload QR Code Image
            </label>

            {/* Clickable Upload Box */}
            <label
              htmlFor="qr-upload"
              className="block border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
            >
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
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

              <p className="text-gray-600 font-medium mb-1">
                Drop QR code image here
              </p>
              <p className="text-gray-400 text-sm">
                or click to browse files
              </p>

              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                aria-label="Upload QR code image"
                className="hidden"
              />
            </label>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                Supports JPG, PNG, WEBP
              </span>
              <span className="text-xs text-gray-400">
                Max 5MB
              </span>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mb-8"
          >
            Analyze QR Code
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
          <div className="bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 rounded-xl p-6 text-center">
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
              Ready to Analyze
            </h3>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Upload a QR code image to see the destination URL and security analysis.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
