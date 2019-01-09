const OrderDao = require('./private/dao');


class OrderService {
    getAllOrders(username) {
        return new Promise((resolve, reject) => {
            OrderDao.getAllOrders(username)
                .then(orders => {
                    console.log(orders);
                    return resolve(orders);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };



    createOrder(order) {
        return OrderDao.createOrder(order);
    }
}

module.exports = new OrderService();
