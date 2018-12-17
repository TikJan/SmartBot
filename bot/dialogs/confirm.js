const builder = require('botbuilder');

const lib = new builder.Library('confirm');



lib.dialog('/', [
    (session, args) => {
        args = args || {};



        let promptMessage = `It has been ordered a ${global.Room}
                         in ${global.Hotel} hotel
                         since ${global.StartDate}
                         to ${global.EndDate}
                         by ${global.Username},
                         phone: ${global.Phone},is it OK ?`;
        builder.Prompts.confirm(session, promptMessage);
        let Card = new builder.HeroCard(session)
            .title()
            .buttons([
                builder.CardAction.imBack(session, session.gettext('YES'), "YES"),
                builder.CardAction.imBack(session, session.gettext('NO'), 'NO')
            ]);
        session.send(new builder.Message(session)
            .addAttachment(Card));
    },
    (session, results) => {
        if(results.response){
            session.replaceDialog('comment')
        }else {
            session.beginDialog(':/');
        }
    }
]);

lib.dialog('comment', [
    (session) => {
        let promptMessage = `Do you want to give a comment?`;
        builder.Prompts.confirm(session, promptMessage);

        let Card = new builder.HeroCard(session)
            .title()
            .buttons([
                builder.CardAction.imBack(session, session.gettext('YES'), "YES"),
                builder.CardAction.imBack(session, session.gettext('NO'), 'NO')
            ]);
        session.send(new builder.Message(session)
            .addAttachment(Card));

    },
    (session, results,next) => {
        if(!results.response){
            session.replaceDialog('order');
        }else {
            next()
        }
    },
    (session,args) => {
        args = args || {};
        let msg = 'Enter your comment';
        builder.Prompts.text(session, msg);
    },
    (session, results) => {
        global.Comment = results.response;
        session.beginDialog('order');
    }
]);

lib.dialog('order', [
    (session) => {
        let order = {
            hotel : global.Hotel,
            room : global.Room,
            startDate : global.StartDate,
            endDate : global.EndDate,
            username : global.Username,
            phone : global.Phone
        };
        console.log('_____________________________________');
        console.log(order);
        console.log('_____________________________________');
        global.Hotel = undefined;
        global.Room = undefined;
        global.StartDate = undefined;
        global.EndDate = undefined;
        global.Comment = undefined;
        global.Username = undefined;
        global.Phone = undefined;
        session.beginDialog(":/");
    }
]);


module.exports.createLibrary = () => {
    return lib.clone();
};
