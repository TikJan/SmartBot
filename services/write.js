const DialogFlog = require('./dialogflow');

const ChackingService = require('./chacking');


class WriteService {

    textProcessing(text) {
        return new Promise((resolve, reject) => {
            DialogFlog.get(text)
                .then(result => {
                    console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');
                    console.log(result)
                    // ChackingService.all(result)
                    //     .then(data => {
                            return resolve(result);
                        // })
                        // .catch(err => {
                        //     return reject(err);
                        // })
                })
                .catch(err => {
                   return reject(err);
                });
        })
    }
}

module.exports = new WriteService();