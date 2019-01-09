const builder = require('botbuilder');
const carousel = require('./carusel');



const RoomService = require('./../../api/components/rooms/service');

const lib = new builder.Library('room-selection');


lib.dialog('/', [
    (session, args) => {

        let promptMessage = 'Select room please';
        if (global.Room) {
            return session.beginDialog('start-date:/');
        } else {

            const room = require('./../../services/rooms');

            room(global.HotelId)
                .then(rooms => {

                    builder.Prompts.text(session, promptMessage);
                    session.send(new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(carousel.create(rooms))
                    );
                })
                .catch(err => {
                    console.log(err);
                });

        }
    },
    (session, results) => {
        global.Room = results.response;
        RoomService.getRoomIdByName(results.response, global.HotelId)
            .then(id => {
                global.RoomId = id[0].id;
            })
            .catch(err => {
                console.log(err);
            });
        return session.beginDialog('start-date:/');
    }
]);



module.exports.createLibrary = () => {
    return lib.clone();
};
