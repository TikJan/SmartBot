const HotelDao = require('./private/dao');


class HotelService {
    getAllHotels() {
        return new Promise((resolve, reject) => {
            HotelDao.getAllHotelTypes()
                .then(hotels => {
                    return resolve(hotels);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };

    getHotelIdByName(name) {
        return HotelDao.getHotelIdByName(name);
    }

}

module.exports = new HotelService();
