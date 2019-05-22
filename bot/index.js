const restify = require('restify');
const builder = require('botbuilder');
const server = restify.createServer();

server.listen(5000, () => {
    console.log('%s listening to %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: "c7fe3fc2-a0e8-4b60-b401-2d757ccd8ae7",
    appPassword: "xrQIRQG38pnhieHN447:?;["
});



global.Hotel;
global.Room;
global.StartDate;
global.EndDate;
global.Comment;
global.Username;
global.Phone;

global.HotelId;
global.RoomId;

let bot = new builder.UniversalBot(connector, session => {

    global.Hotel = undefined;
    global.Room = undefined;
    global.StartDate = undefined;
    global.EndDate = undefined;
    global.Comment = undefined;
    global.Username = undefined;
    global.Phone = undefined;

    if (localizedRegex(session, ['New Order']).test(session.message.text)) {
        return session.beginDialog('hotel-selection:/');
    }
    if (localizedRegex(session, ['My Orders']).test(session.message.text)) {
        return session.beginDialog('orders:/');
    }
    if (localizedRegex(session, ['Help']).test(session.message.text)) {
        return session.beginDialog('help:/');
    }
    if (localizedRegex(session, ['Write']).test(session.message.text)) {
        return session.beginDialog('writer:/');
    }

    let welcomeCard = new builder.HeroCard(session)
        .title('Welcome to IKM Smart bot')
        .subtitle('Select your action or type your wishes')
        .images([
            new builder.CardImage(session)
                .url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/YSU_gerb.jpg/220px-YSU_gerb.jpg')
                .alt('smart bot')
        ])
        .buttons([
            builder.CardAction.imBack(session, session.gettext('New Order'), 'New Order'),
            builder.CardAction.imBack(session, session.gettext('My Orders'), 'My Orders'),
            builder.CardAction.imBack(session, session.gettext('Write'), 'Write Order'),
            builder.CardAction.imBack(session, session.gettext('Help'), 'Help')
        ]);
    session.send(new builder.Message(session)
        .addAttachment(welcomeCard));
});


bot.set('persistConversationData', true);



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

    return regex;
}

function a() {


    bot.on('conversationUpdate', (message) => {
        console.log('covers Update');
        if (message.membersAdded) {
            message.membersAdded.forEach((identity) => {
                if (identity.id === message.address.bot.id) {
                    bot.beginDialog(message.address, '/');
                }
            });
        }
    });
}
a();

bot.library(require('./dialogs/orders').createLibrary());
bot.library(require('./dialogs/help').createLibrary());
bot.library(require('./dialogs/hotelSelection').createLibrary());
bot.library(require('./dialogs/room').createLibrary());
bot.library(require('./dialogs/startDate').createLibrary());
bot.library(require('./dialogs/endDate').createLibrary());
bot.library(require('./dialogs/confirm').createLibrary());
bot.library(require('./dialogs/user').createLibrary());
bot.library(require('./dialogs/writer').createLibrary());



let connectorListener = connector.listen();
function listen() {
    return (req, res) => {
        // Capture the url for the hosted application
        // We'll later need this url to create the checkout link
        let url = req.protocol + '://' + req.get('host');
        // siteUrl.save(url);
        connectorListener(req, res);
    };
}


function beginDialog(hotelSelection, dialogId, dialogArgs) {
    bot.beginDialog(hotelSelection, dialogId, dialogArgs);
}



function sendMessage(message) {
    bot.send(message);
}

module.exports = {
    listen: listen,
    beginDialog: beginDialog,
    sendMessage: sendMessage
};
