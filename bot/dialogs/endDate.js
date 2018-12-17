const builder = require('botbuilder');

let lib = new builder.Library('end-date');




lib.dialog('/', [
    (session, args) => {
        args = args || {};
        if (global.EndDate) {
            return session.beginDialog('confirm:/');
        } else {
            let promptMessage = 'Please enter the day you want to finish your order';

            builder.Prompts.time(session, promptMessage);
        }
    },
    (session, results) => {
        global.EndDate = results.response.entity;
        return session.beginDialog('user:/');
    }
]);


module.exports.createLibrary = () => {
    return lib.clone();
};
