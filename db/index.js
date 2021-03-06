// load env variables
require('dotenv').config();
const pg = require('pg');

// connectiong to database

const pool = new pg.Pool({
  connectionString: 
  process.env.NODE_ENV==='test'
  ?
  process.env.TEST_DATABASE_URL
  :
  process.env.DATABASE_URL
});

module.exports = pool;
