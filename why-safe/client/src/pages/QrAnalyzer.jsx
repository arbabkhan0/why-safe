import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { analyzeUrl } from '../services/api';

export default function QrAnalyzer() {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' or 'upload'
  const [decodedUrl, setDecodedUrl] = useState(null);
  const [scanError, setScanError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  // Analysis states (reused from UrlAnalyzer logic)
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const html5QrCodeRef = useRef(null);
  const readerId = "reader";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        if (isScanning) {
            html5QrCodeRef.current.stop().catch(err => console.error(err));
        }
        html5QrCodeRef.current.clear();
      }
    };
  }, [isScanning]);

  const startCamera = async () => {
    setScanError('');
    setDecodedUrl(null);
    setAnalysisResult(null);
    
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(readerId);
      }
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {}
      );
      setIsScanning(true);
    } catch {
      setScanError("Camera access denied or not available. Please allow camera permissions.");
      setIsScanning(false);
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Failed to stop camera", err);
      }
    }
  };

  const handleScanSuccess = (decodedText) => {
    stopCamera();
    setDecodedUrl(decodedText);
    setScanError('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanError('');
    setDecodedUrl(null);
    setAnalysisResult(null);

    try {
      const html5QrCode = new Html5Qrcode("file-reader-placeholder");
      const decodedText = await html5QrCode.scanFile(file, true);
      setDecodedUrl(decodedText);
    } catch {
      setScanError("Invalid QR code. Please upload a clear image containing a QR code.");
    }
  };

  const handleAnalyzeSecurity = async () => {
    if (!decodedUrl) return;
    setAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult(null);
    try {
      // We assume the decoded text is a URL. If not, the backend might reject it or analyze it as text.
      // Basic check:
      if (!decodedUrl.startsWith('http')) {
         // It might be just text, but let's try to analyze it anyway or warn user
      }
      const data = await analyzeUrl(decodedUrl);
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisError(err.error || 'Failed to analyze URL');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTabChange = (tab) => {
    if (activeTab === 'camera' && tab !== 'camera') {
        stopCamera();
    }
    setActiveTab(tab);
    setScanError('');
    // Don't clear result when switching tabs, so user can see what they scanned
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
              QR Code Security
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary mb-3">
            QR Code Analyzer
          </h1>

          <p className="text-brand-text-secondary max-w-lg mx-auto">
            Scan or upload a QR code to preview and analyze its destination safely.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-brand-card rounded-2xl shadow-lg border border-brand-border overflow-hidden">
            
          {/* Tabs */}
          <div className="flex border-b border-brand-border">
            <button
                onClick={() => handleTabChange('camera')}
                className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                    activeTab === 'camera' 
                    ? 'text-brand-primary border-b-2 border-brand-primary bg-brand-primary/5' 
                    : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg'
                }`}
            >
                Scan using Camera
            </button>
            <button
                onClick={() => handleTabChange('upload')}
                className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                    activeTab === 'upload' 
                    ? 'text-brand-primary border-b-2 border-brand-primary bg-brand-primary/5' 
                    : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-bg'
                }`}
            >
                Upload QR Image
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {/* Camera View */}
            <div className={activeTab === 'camera' ? 'block' : 'hidden'}>
                <div className="relative bg-black rounded-xl overflow-hidden mb-6 min-h-[300px] flex flex-col items-center justify-center">
                    {/* Always render the scanner container so it exists in DOM when startCamera is called */}
                    <div id={readerId} className="w-full h-full absolute inset-0"></div>

                    {!isScanning && (
                        <div className="relative z-10 text-center p-6 w-full h-full flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px]">
                            <svg className="w-12 h-12 mx-auto text-brand-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <button 
                                onClick={startCamera}
                                className="px-6 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-secondary transition shadow-lg"
                            >
                                {decodedUrl ? "Scan Again" : "Start Camera"}
                            </button>
                        </div>
                    )}
                    
                    {isScanning && (
                        <button 
                            onClick={stopCamera}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur hover:bg-black/70 transition z-10"
                        >
                            Stop Scanning
                        </button>
                    )}
                </div>
            </div>

            {/* Upload View */}
            <div className={activeTab === 'upload' ? 'block' : 'hidden'}>
                <div className="mb-8">
                    <label
                    htmlFor="qr-upload"
                    className="block border-2 border-dashed border-brand-border rounded-2xl p-8 text-center hover:border-brand-primary transition-colors cursor-pointer bg-brand-bg/50"
                    >
                        <svg
                            className="w-12 h-12 mx-auto text-brand-text-secondary mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>

                        <p className="text-brand-text-primary font-medium mb-1">
                            Click to upload QR image
                        </p>
                        <p className="text-brand-text-secondary text-sm">
                            JPG, PNG, WEBP supported
                        </p>

                        <input
                            id="qr-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                    {/* Placeholder for logic-only instance if needed, though we use new Html5Qrcode each time */}
                    <div id="file-reader-placeholder" className="hidden"></div>
                </div>
            </div>

            {/* Error Message */}
            {scanError && (
                <div className="mb-6 p-4 bg-brand-danger/10 text-brand-danger rounded-xl text-center border border-brand-danger/20">
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {scanError}
                    </div>
                </div>
            )}

            {/* Decoded Result */}
            {decodedUrl && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-brand-border"></div>
                        <span className="px-4 text-sm text-brand-text-secondary font-medium">
                            Scan Result
                        </span>
                        <div className="flex-1 border-t border-brand-border"></div>
                    </div>

                    <div className="bg-brand-warning/10 rounded-xl p-6 border border-brand-warning/20 mb-6">
                        <span className="block text-xs font-semibold text-brand-warning uppercase tracking-wide mb-2">
                            Decoded Destination
                        </span>
                        <div className="p-4 bg-brand-card border border-brand-border rounded-lg text-brand-text-primary font-mono break-all text-lg shadow-sm">
                            {decodedUrl}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {!analysisResult && (
                        <button
                            onClick={handleAnalyzeSecurity}
                            disabled={analyzing}
                            className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {analyzing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Checking Safety...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Analyze Security Risk
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Analysis Result (Reused from UrlAnalyzer) */}
            {analysisResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-brand-card rounded-xl border border-brand-border p-6 shadow-sm mt-6">
                     <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-brand-text-primary">Risk Level:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(analysisResult.riskLevel)}`}>
                        {analysisResult.riskLevel}
                        </span>
                    </div>

                    {/* Explanation Box */}
                    {analysisResult.explanation && (
                        <div className={`mb-6 p-4 rounded-lg border ${
                            analysisResult.riskLevel === 'High' ? 'bg-brand-danger/10 border-brand-danger/20 text-brand-danger' :
                            analysisResult.riskLevel === 'Medium' ? 'bg-brand-warning/10 border-brand-warning/20 text-brand-warning' :
                            'bg-brand-success/10 border-brand-success/20 text-brand-success'
                        }`}>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-medium">
                                    {analysisResult.explanation}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <span className="font-semibold text-brand-text-primary">Risk Score:</span>
                        <div className="w-full bg-brand-border rounded-full h-2.5 mt-1">
                        <div 
                            className={`h-2.5 rounded-full ${analysisResult.riskLevel === 'High' ? 'bg-brand-danger' : analysisResult.riskLevel === 'Medium' ? 'bg-brand-warning' : 'bg-brand-success'}`} 
                            style={{ width: `${analysisResult.riskScore}%` }}
                        ></div>
                        </div>
                        <div className="text-right text-xs text-brand-text-secondary mt-1">{analysisResult.riskScore}/100</div>
                    </div>

                    <div className="space-y-3">
                        {analysisResult.checks.map((check, index) => (
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
            )}
            
            {analysisError && (
                 <div className="mt-6 p-4 bg-brand-danger/10 text-brand-danger rounded-xl text-center">
                    {analysisError}
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
