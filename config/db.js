const { Sequelize } = require('sequelize');
const { Pool } = require('pg');
require('dotenv').config();

// Configure Sequelize for ORM
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 5432, // Database port (default 5432 for PostgreSQL)
    dialect: 'postgres',
    logging: false, 
  }
);

// Configure pg Pool for direct queries
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  
  port: process.env.DB_PORT || 5432, 
});

module.exports = { sequelize, pool };
