const shortid = require('shortid');
const format = require('pg-format');
const db = require('../db');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const { ErrorWithHttpStatus } = require('../utils/ErrorWithHttpStatus');

/**
 * a snippet object
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/**
 * Inserts a new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */

exports.insert = ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new Error('Missing properties', 400);
    // want to add an HTTPREQUEST but its not a constructor?

    return db.query(
      'INSERT INTO snippet (author, code, title, description, language) VALUES ($1, $2, $3, $4, $5)',
      [author, code, title, description, language]
    );
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Selects snippets from DB.
 * Can accept optional query object to filter results;
 * otherwise, returns all snippets.
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} array of Snippet objects
 */

exports.select = async query => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');

    const formattedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );

    const results = await db.query(formattedSelect, Object.values(query));
    return results.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/**
 * Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 */
exports.update = async (id, newData) => {
  try {
    const { author, code, title, description, language } = newData;
    await db.query(
      `UPDATE snippets 
    SET 
      author = COALESCE($2, author),
      code = COALESCE($3, code),
      title = COALESCE($4, title),
      description = COALESCE($5, description),
      language=COALESCE($6, language)
    WHERE id = ($1)`,
      [id, author, code, title, description, language]
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Deletes a snippet
 * @param {string} id
 */

exports.delete = async id => {
  try {
    const results = await db.query(`DELETE FROM snippet WHERE id= $1`, [id]);
    if (results.rowCount === 0) return results.rows;
    throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404);
  } catch (err) {
    console.log(err);
    throw new ErrorWithHttpStatus('Database error');
  }
};
