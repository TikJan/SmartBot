const SQL = require('./../../modules/postgres');


class Dao {

    getAllRoomTypes(name) {
        return new Promise((resolve, reject) => {
            let query = `SELECT rt.name, r.info, r.avatar, r.id
                            FROM rooms r
                            LEFT JOIN room_type rt on rt.id = r.roomtypeid
                            RIGHT JOIN hotels h on r.hotelid = h.id
                            WHERE h.name = $1;`;
            SQL.query(query, [name])
                .then(rooms => {
                    return resolve(rooms);
                })
                .catch(err => {
                    console.log(err);
                    return reject(err);
                });
        })
    };


    getRoomIdByName(name) {
        return new Promise((resolve, reject) => {
            let query = `SELECT id
                            FROM room_type
                            WHERE name = $1;`;

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



