// load env variables
require('dotenv').config();
const pg = require('pg');

// connectiong to database

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
