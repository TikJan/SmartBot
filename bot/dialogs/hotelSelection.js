const builder = require('botbuilder');
const carousel = require('./carusel');
const hotel = require('../../services/hotels');
const HotelService = require('./../../api/components/hotels/service');

let hotels;
hotel()
    .then(data => {
        hotels = data
    })
    .catch(err => {
        console.log(err);
    });


const lib = new builder.Library('hotel-selection');


lib.dialog('/', [
    (session, args) => {
        let promptMessage = 'Select hotel please';
        if (global.Hotel) {
            return session.beginDialog('room-selection:/');
        } else {
            builder.Prompts.text(session, promptMessage);
            session.send(new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(carousel.create(hotels))
            );
        }
    },
    (session, results) => {
        global.Hotel = results.response;
        HotelService.getHotelIdByName(results.response)
            .then(id => {
                global.HotelId = id[0].id;
                return session.beginDialog('room-selection:/');
            })
            .catch(err => {
                console.log(err);
                return session.beginDialog('hotel-selection:/');
            });
    }
]);



module.exports.createLibrary = () => {
    return lib.clone();
};
