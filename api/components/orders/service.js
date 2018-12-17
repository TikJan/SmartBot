const OrderDao = require('./private/dao');


class OrderService {
    getAllOrders() {
        return new Promise((resolve, reject) => {
            OrderDao.getAllOrders()
                .then(orders => {
                    console.log(orders);
                    return resolve(orders);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };
}

module.exports = new OrderService();
