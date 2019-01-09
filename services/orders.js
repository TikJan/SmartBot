
const OrderService = require('./../api/components/orders/service');


function getOrders(username) {
    return new Promise((resolve, reject) => {

        OrderService.getAllOrders(username)
            .then(orders => {

                let l = [];

                for(let i = 0; i < orders.length; ++i) {
                    l.push({
                        title: orders[i].hotel,
                        subtitle: orders[i].hotel + ' hotel\n' + orders[i].room + ' room\nsince ' + orders[i].startdate
                                    + '\nto ' + orders[i].enddate + '\nuser: ' + orders[i].username + '\nphone: ' + orders[i].phone
                                    + '\ncomment: ' + orders[i].comment || '',
                        url: orders[i].photourl
                    });
                }
                let k = l.map(j => {
                    return {
                        title: j.title,
                        subtitle: j.subtitle,
                        url: j.url
                    }

                });
                return  resolve(k);
            })
            .catch(err => {
                console.log(err);
                return reject('No orders');
            });
    });
};


function createOrder(order) {
    return OrderService.createOrder(order);
}


module.exports = {
    getOrders : getOrders,
    createOrder : createOrder
};
