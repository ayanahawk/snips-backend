const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const router = require('./middleware/routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
// TODO: Add CORS with all origins for testing
app.use(cors());
app.use(express.json()); // parses requests with JSON payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Now start our app */
app.listen(process.env.PORT || 5000, () => {
  console.log('Snips server running on port 5000');
});
