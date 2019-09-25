const express = require('express');
const snippets = require('../controllers/snippets.controller');
const author=require('../controllers/authors.controllers') 
const router = express.Router();
const validate=require('./validate')

router.get('/', (request, response, next) => {
  response.send('Welcome to Snips!');
});

router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API!');
});

/* Snippets routes */
router.post('/api/snippets', validate, snippets.createSnippet);
router.get('/api/snippets', snippets.getAllSnippets);
router.get('/api/snippets/:id', snippets.getSnippetById);
router.patch('/api/snippets/:id',validate, snippets.update);
router.delete('/api/snippets/:id', validate,snippets.delete);


/**
 * author routes
 */
router.post('/api/signup', author.signup);
router.get('/api/login',author.login);

module.exports = router;
