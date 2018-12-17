const SQL = require('./../../modules/postgres');


class Dao {

    getAllOrders() {
        return new Promise((resolve, reject) => {
            let query = `SELECT o.username, o.phone, o.comment, r2.name as room, h2.name as hotel, r2.photourl, o.startdate, o.enddate
                            FROM orders o
                            LEFT JOIN rooms r ON o.room = r.id
                            LEFT OUTER JOIN roomtype r2 on r.roomTypeId = r2.id
                            LEFT OUTER JOIN hotels h2 on r2.hotelId = h2.id;`;
            SQL.query(query)
                .then(orders => {
                    return resolve(orders);
                })
                .catch(err => {
                    console.log('___________________________________________');
                    console.log(err);
                    return reject(err);
                });
        })
    };


}

module.exports = new Dao();



