const express = require('express');
const router = express.Router();
const messageAnalyzer = require('../services/messageAnalyzer');

router.post('/analyze-message', (req, res) => {
  const { text, type } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Message text is required' });
  }
  const result = messageAnalyzer.analyzeMessage(text, type || 'unknown');
  res.json(result);
});

module.exports = router;
