const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const cors = require('cors');  // ONLY ONE

app.use(cors({
  origin: [
    'http://localhost:5000',
    'https://learning-platform-1-79r5.onrender.com'  // <-- your frontend URL
  ],
  credentials: true
}));

require('dotenv').config();

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'LearnOS API running ✓' });
});

// ── MongoDB Connect ───────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✓ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });