const SQL = require('./../../modules/postgres');
const moment = require('moment');

class Dao {

    getAllOrders(username) {
        return new Promise((resolve, reject) => {
            let query = `SELECT o.username, o.phone, o.comment, r.name as room, h.name as hotel, o.startdate::date, o.enddate::date
                            FROM orders o
                            LEFT JOIN rooms r1 on r1.id = o.room
                            LEFT JOIN room_type r on r.id = r1.roomtypeid
                            LEFT OUTER JOIN hotels h on r1.hotelid = h.id
                            WHERE username=$1`;
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

            order.startDate = new Date(order.startDate)//.format('MM/DD/YYYY');
            order.endDate = new Date(order.endDate)//.format('MM/DD/YYYY');
            console.log()
            let room ;
            if(order.roomId && order.roomId.length > 0)
                room = order.roomId[0].id
            SQL.query(query, [room, order.username, order.phone, order.comment || '', order.startDate, order.endDate])
                .then(data => {
                    return resolve(data);
                })
                .catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    }

}

module.exports = new Dao();



