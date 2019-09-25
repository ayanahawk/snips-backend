const db = require('../db');
const ErrorWitHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.insert = ({ password, name }) => {
    try {
        if (!password || !name)
            throw new Error('Missing props', 400);

        return db.query(
            'INSERT INTO author(name, password) VALUES ($1,$2)',
            [name, password]
        );

    } catch (err) {
        console.log(err);
        if (err instanceof ErrorWithHttpStatus) throw err;
        else throw new ErrorWithHttpStatus('Database error');
    }

};
exports.select = async name=> {
    try {
        const sql = `SELECT * FROM author WHERE name=$1`;
        const result = await db.query(sql, [name]);
        return result.rows[0];
    } catch (err) {
        throw new ErrorWithHttpStatus('Database error')
    }


}


