const SQL = require('./../../modules/postgres');


class Dao {

    getAllRoomTypes(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * 
                         FROM public."roomtype"
                         WHERE "hotelid" = ${id};`;
            console.log('___________________________________________');
            console.log(query);
            SQL.query(query)
                .then(rooms => {
                    return resolve(rooms);
                })
                .catch(err => {
                    console.log('___________________________________________');
                    console.log(err);
                    return reject(err);
                });
        })
    };


    getRoomIdByName(name, id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT id
                            FROM roomtype
                            WHERE name=$1 and "hotelid"=$2`;

            SQL.query(query, [name, id])
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



