
const OrderService = require('./../api/components/orders/service');


function getOrders() {
    return new Promise((resolve, reject) => {

        let l = [];
        OrderService.getAllOrders()
            .then(orders => {
                for(let i = 0; i < orders.length; ++i) {
                    l.push({
                        subtitle: orders[i].hotel + ' hotel\n' + orders[i].room + ' room\nsince ' + orders[i].startDate
                                    + '\nto ' + orders[i].endDate + '\nuser: ' + orders[i].username + '\nphone: ' + orders[i].phone
                                    + 'comment: ' + orders[i].comment,
                        url: orders[i].photourl
                    });
                }
                let k = l.map(i => {
                    return {
                        subtitle: i.subtitle,
                        url: i.url
                    }

                });
                return  resolve(k);
            })
            .catch(err => {
                console.log(err);
                return reject('No orders');
            });
    });
}


module.exports = getOrders;
