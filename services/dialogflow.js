const apiai = require("apiai");
const app = apiai("70997cd096a44e93b887bdb48afacef2");
const Promise = require('bluebird');
const uuid = require('uuid');
let request = app.textRequest('sadfsdf', {
    sessionId: uuid.v4()
});

module.exports = {
    get: (text) => {
        return new Promise((resolve, reject) => {
            // console.log('================================-===============================================');
            let request = app.textRequest(text, {
                sessionId: uuid.v4()
            });

            request.on('error', error => {
                console.log(error);
                return reject(error + " Error");
            });
            request.on('response', response => {
                console.log(response)
                return resolve({
                    hotelName: response.result.parameters.in,
                    room: response.result.parameters.room,
                    endDate: response.result.parameters.since,
                    startDate: response.result.parameters.to
                });
            })
            request.end();

            // return ({
            //     hotelName: 'Mariott Yerevan',
            //     room: 'Junior',
            //     startDate: '5/12/2019',
            //     endDate: '5/20/2019'
            // });
        })
    }
};
// console.log('================================-===============================================');
