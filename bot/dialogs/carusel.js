const builder = require('botbuilder');

module.exports = {
    create: (ithem) => {
         console.log(ithem);
        return ithem.map(i => {
            let card = new builder.HeroCard()
                .title(i.title)
                .buttons([
                    new builder.CardAction()
                        .type('imBack')
                        .value(i.title)
                        .title(i.title)
                ]);
            if (i.subtitle) {
                card = card.subtitle(i.subtitle);
            }

            if (i.url) {
                card = card.images([
                    new builder.CardImage()
                        .url(i.url)
                        .alt(i.alt)
                ]);
            }
            return card;
        })

    }
}
