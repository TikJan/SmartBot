const builder = require('botbuilder');

let lib = new builder.Library('start-date');




lib.dialog('/', [
    (session, args) => {
        args = args || {};
        if (global.StartDate) {
            return session.beginDialog('end-date:/');
        } else {
            let promptMessage = 'Please enter the day you want to start your order';

            builder.Prompts.time(session, promptMessage);
        }
    },
    (session, results) => {
        global.StartDate = results.response.entity;
        return session.beginDialog('end-date:/');
    }
]);


module.exports.createLibrary = () => {
    return lib.clone();
};
