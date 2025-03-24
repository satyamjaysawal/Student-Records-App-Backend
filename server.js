// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const studentRoutes = require('./routes/studentRoutes');

// const app = express();

// app.use(cors({ origin: process.env.FRONTEND_URL }));
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// CORS: Allow frontend to access backend
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Default route
app.get('/', (_req, res) => {
    res.send('Node.js server is running on Vercel!');
});
// Export app for Vercel
module.exports = app;
