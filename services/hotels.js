const HotelService = require('./../api/components/hotels/service');

class Hotels {
    getHotels() {
        return new Promise((resolve, reject) => {

            let l = [];
            HotelService.getAllHotels()
                .then(hotels => {
                    for (let i = 0; i < hotels.length; ++i) {
                        l.push({
                            title: hotels[i].name,
                            subtitle: hotels[i].stars + ' stars',
                            url: hotels[i].avatar,
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
                    return resolve(k);
                })
                .catch(err => {
                    console.log(err);
                    return reject('No hotels');
                });
        });
    };

    getHotelIdByName(hotelName) {
        return new Promise((resolve, reject) => {

            HotelService.getHotelIdByName(hotelName)
                .then(id => {
                    if (!id) {
                        return reject('No such hotel');
                    }
                    return resolve(id);
                })
                .catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    }
}

module.exports = new Hotels();
