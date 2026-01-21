const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import Routes
const urlRoutes = require('./routes/urlRoutes');
const messageRoutes = require('./routes/messageRoutes');
const identityRoutes = require('./routes/identityRoutes');
const qrRoutes = require('./routes/qrRoutes');

// Use Routes
app.use('/api', urlRoutes);
app.use('/api', messageRoutes);
app.use('/api', identityRoutes);
app.use('/api', qrRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'SecureScan API is running', 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
