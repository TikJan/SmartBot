const HotelService = require('./../api/components/hotels/service');


function getHotels() {
    return new Promise((resolve, reject) => {

        let l = [];
        HotelService.getAllHotels()
        .then(hotels => {
            for(let i = 0; i < hotels.length; ++i) {
                let stars = '';
                for (let j = 0; j < hotels[i].stars; ++j) {
                    stars += '*';
                }
                l.push({
                    title: hotels[i].name,
                    subtitle: stars,
                    url: hotels[i].photourl,
                    alt: hotels[i].id
                });
            }
            let k = l.map(i => {
                return {
                    title: i.title,
                    subtitle: i.subtitle,
                    url: i.url,
                    alt: i.alt
                }

            });
            return  resolve(k);
        })
        .catch(err => {
            console.log(err);
            return reject('No hotels');
        });
    });
}


module.exports = getHotels;
