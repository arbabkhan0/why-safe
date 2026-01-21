const Jimp = require('jimp');
const jsQR = require('jsqr');
const urlAnalyzer = require('./urlAnalyzer');
const { generateExplanation } = require('./explanationGenerator');

exports.decodeQr = async (imageBuffer) => {
  try {
    const image = await Jimp.read(imageBuffer);
    const { data, width, height } = image.bitmap;

    // jsQR expects a Uint8ClampedArray of RGBA pixel data
    const code = jsQR(new Uint8ClampedArray(data), width, height);

    if (code) {
      const url = code.data;
      // If the decoded data looks like a URL, analyze it
      // Otherwise just return the text
      let analysis = null;
      let explanation = null;

      if (url.startsWith('http') || url.startsWith('www')) {
        analysis = urlAnalyzer.analyzeUrl(url);
        // If analysis exists, it includes explanation, but we can surface it or keep it inside analysis
      } else {
        // Plain text explanation
        explanation = generateExplanation('Low', [], 'QR code');
      }

      return {
        decodedData: url,
        analysis,
        explanation: analysis ? analysis.explanation : explanation
      };
    } else {
      return { error: 'No QR code found in image' };
    }
  } catch (error) {
    console.error('QR Decode Error:', error);
    return { error: 'Failed to process image' };
  }
};
