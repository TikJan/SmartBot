const builder = require('botbuilder');

let lib = new builder.Library('user');




lib.dialog('/', [
    (session, args) => {
        args = args || {};
        if (global.Username) {
            return session.beginDialog('end-date:/');
        } else {
            let promptMessage = 'Please enter your name and surname';

            builder.Prompts.text(session, promptMessage);
        }
    },
    (session, results) => {
        global.Username = results.response;

        console.log('_____________________________________');
        console.log(results.response);
        console.log(global.Username);
        console.log('_____________________________________');
        return session.beginDialog('phone');
    }
]);



lib.dialog('phone', [
    (session, args) => {
        args = args || {};
        if (global.Phone) {
            return session.beginDialog('confirm:/');
        } else {
            let promptMessage = 'Please enter your phone number';

            builder.Prompts.text(session, promptMessage);
        }
    },
    (session, results) => {
        global.Phone = results.response;
        console.log('_____________________________________');
        console.log(results.response);
        console.log(global.Phone);
        console.log('_____________________________________');
        return session.beginDialog('confirm:/');
    }
]);


module.exports.createLibrary = () => {
    return lib.clone();
};
