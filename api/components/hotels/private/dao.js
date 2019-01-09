const SQL = require('./../../modules/postgres');


class Dao {

    getAllHotelTypes() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * 
                         FROM hotels
                         ORDER BY stars desc;`;

            SQL.query(query)
                .then(hotels => resolve(hotels))
                .catch(err => reject(err));
        })
    };


    getHotelIdByName(name) {
        return new Promise((resolve, reject) => {
            let query = `SELECT id
                            FROM hotels
                            WHERE name=$1`;

            SQL.query(query, [name])
                .then(data => {
                    return resolve(data);
                })
                .catch(err => {
                    return reject(err);
                })
        })
    }

}

module.exports = new Dao();



