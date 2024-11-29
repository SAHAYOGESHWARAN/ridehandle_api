const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/db');

require('dotenv').config();
const { Client } = require('pg'); // Import pg Client for PostgreSQL

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const fareRoutes = require('./routes/fareRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection setup for PostgreSQL
const client = new Client({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT 
});


sequelize.authenticate()
  .then(() => console.log('Sequelize connected to PostgreSQL successfully'))
  .catch(err => console.error('Sequelize connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/fares', fareRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
