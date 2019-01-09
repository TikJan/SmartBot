const SQL = require('./../../modules/postgres');


class Dao {

    getAllOrders(username) {
        return new Promise((resolve, reject) => {
            let query = `SELECT o.username, o.phone, o.comment, r.name as room, h.name as hotel, r.photourl, o.startdate::date, o.enddate::date
                            FROM orders o
                            LEFT JOIN roomtype r on r.id = o.room
                            LEFT OUTER JOIN hotels h on r.hotelId = h.id
                            WHERE username=$1;`;
            SQL.query(query, [username])
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



    createOrder(order) {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO orders (room, username, phone, comment, startdate, enddate)
                        VALUES ($1, $2, $3, $4, $5, $6);`;


            SQL.query(query, [order.roomId, order.username, order.phone, order.comment || '', order.startDate, order.endDate])
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



