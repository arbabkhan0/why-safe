const express = require('express');
const router = express.Router();
const urlAnalyzer = require('../services/urlAnalyzer');

router.post('/analyze-url', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const result = urlAnalyzer.analyzeUrl(url);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

module.exports = router;
