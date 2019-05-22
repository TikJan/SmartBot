const builder = require('botbuilder');

const WriteService = require('./../../services/write');

let lib = new builder.Library('writer');




lib.dialog('/', [
    (session, args) => {
        args = args || {};

            let promptMessage = 'Please enter your order';

            builder.Prompts.text(session, promptMessage);

    },
    (session, results) => {

        WriteService.textProcessing(results.response)
            .then(data => {
                console.log(data)
                console.log('_________________________________------________________________________________');
                global.Hotel = data.hotelName;
                global.Room = data.room;
                global.StartDate = data.startDate;
                global.EndDate = data.endDate;
                if (!Hotel) {
                    return session.beginDialog('hotel-selection:/');
                }
                if (!Room) {
                    return session.beginDialog('room-selection:/');
                }
                if (!StartDate) {
                    return session.beginDialog('start-date:/');
                }
                if (!EndDate) {
                    return session.beginDialog('end-date:/');
                }
                return session.beginDialog('user:/');
            })
            .catch(err => {
                let promptMessage = 'Please write correctly or chose from cards';

                builder.Prompts.text(session, promptMessage);
                return session.beginDialog('/');
            });
    }
]);






module.exports.createLibrary = () => {
    return lib.clone();
};
