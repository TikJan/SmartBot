const builder = require('botbuilder');

let lib = new builder.Library('help');




lib.dialog('/', [
    (session, args) => {

        let promptMessage = `Welcome to Smart Booking Bot.\nFor booking a room in hotel select "New Order" button and select hotel, room etc\nYou can watch your orders using "Orders" button`;

        builder.Prompts.text(session, promptMessage);
        return session.endDialog(`Write something to go back`);

    }
]);


module.exports.createLibrary = () => {
    return lib.clone();
};
