const builder = require('botbuilder');
const carousel = require('./carusel');

const OrderService = require('../../services/orders');

let lib = new builder.Library('orders');




// lib.dialog('/', [
//     (session, args) => {
//         args = args || {};
//
//         if (localizedRegex(session, ['YES']).test(session.message.text)) {
//             return session.beginDialog('/get-username');
//         }
//         if (localizedRegex(session, ['NO']).test(session.message.text)) {
//             return session.beginDialog(':/');
//         }
//
//
//         let Card = new builder.HeroCard(session)
//             .title('Do you want to get your active orders?')
//             .buttons([
//                 builder.CardAction.imBack(session, session.gettext('YES'), "YES"),
//                 builder.CardAction.imBack(session, session.gettext('NO'), 'NO')
//             ]);
//         session.send(new builder.Message(session)
//             .addAttachment(Card));
//
//     },
//     (session, results) => {
//         return session.endDialog();
//         // return session.beginDialog(':/');
//     }
// ]);

let username;




lib.dialog('/', [
    (session, args) => {
        args = args || {};
        let promptMessage = 'Please enter your name and surname';

        builder.Prompts.text(session, promptMessage);

    },
    (session, results) => {
        username = results.response;
        return session.beginDialog('/get-orders');
    }
]);

lib.dialog('/get-orders', [
    (session, args) => {
        args = args || {};


        if (localizedRegex(session, ['Go Back']).test(session.message.text)) {
            session.clearDialogStack()

            session.beginDialog('/');
            return
        }
        if (localizedRegex(session, ['help']).test(session.message.text)) {
            return session.beginDialog('help:/');
        }

        const order = require('./../../services/orders');

        order.getOrders(username)
            .then(orders => {
                username = undefined;
                session.send(new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(carousel.create(orders))
                );


                let Card = new builder.HeroCard(session)
                    .title('Select your action')
                    .buttons([
                        builder.CardAction.imBack(session, session.gettext('Go Back'), "Go Back"),
                        builder.CardAction.imBack(session, session.gettext('Help'), 'Help')
                    ]);
                session.send(new builder.Message(session)
                    .addAttachment(Card));

            })
            .catch(err => {
                builder.Prompts.text(session, 'You have no orders');
                console.log(err);
                session.replaceDialog('/');
                return;
            });

    },
    (session, results) => {
        global.StartDate = results.response.entity;
        return session.replaceDialog('/');
    }
]);





let LocalizedRegexCache = {};
function localizedRegex(session, localeKeys) {
    let locale = session.preferredLocale();
    let cacheKey = locale + ":" + localeKeys.join('|');
    if (LocalizedRegexCache.hasOwnProperty(cacheKey)) {
        return LocalizedRegexCache[cacheKey];
    }

    let localizedStrings = localeKeys.map((key) => { return session.localizer.gettext(locale, key); });
    let regex = new RegExp('^(' + localizedStrings.join('|') + ')', 'i');
    LocalizedRegexCache[cacheKey] = regex;
    console.log(regex);
    return regex;
}


module.exports.createLibrary = () => {
    return lib.clone();
};
