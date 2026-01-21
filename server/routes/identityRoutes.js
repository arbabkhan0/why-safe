const express = require('express');
const router = express.Router();
const identityChecker = require('../services/identityChecker');

router.post('/check-identity', (req, res) => {
  const { email, username } = req.body;
  if (!email && !username) {
    return res.status(400).json({ error: 'Email or Username is required' });
  }
  const result = identityChecker.checkIdentity(email, username);
  res.json(result);
});

module.exports = router;
