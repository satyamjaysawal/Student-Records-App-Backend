const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Allow only the deployed frontend origin
const allowedOrigins = [
  'https://student-records-app-frontend.vercel.app' // Production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (_req, res) => {
    res.send('Node.js server is running on Vercel!');
});
// Export app for Vercel
module.exports = app;
