const { Pool, Client } = require('pg');

let dbConfig = {
    DB: {
        user: 'tigranvardanyan',
        host: "127.0.0.1",
        database: "kursayin",
        password: "",
        port: 5432,
    }
};



const pool = new Pool(dbConfig.DB);



module.exports = {

    async query(text, params) {



        try {
            const result = await pool.query(text, params);
            return result.rows;
        } catch (err) {
            throw Error(err);
        }
    }
}
