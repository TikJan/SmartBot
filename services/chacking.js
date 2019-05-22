const HotelService = require('./hotels');
const RoomService = require('./rooms');
const DateService = require('./dates');

class ChackingService {

    all(body) {
        return new Promise((resolve, reject) => {
            if (body.hotel) {
                HotelService.getHotelIdByName(body.hotel)
                    .then(hotelId  => {
                        if (!hotelId) {
                            return reject;
                        }
                        global.Hotel = body.hotel;
                        global.HotelId = hotelId;

                        if (body.room) {
                            RoomService.getRoomIdByName(body.room)
                                .then(roomId  => {
                                    global.Room = body.room;
                                    global.RoomId = roomId;
                                    if (body.since && body.to) {
                                        // DateService.getDays(body.hotelId, body.roomId, body.since, body.to)
                                        //     .then(isFree => {
                                                global.StartDate = body.since;
                                                global.EndDate = body.to;
                                                return resolve;
                                            // })
                                            // .catch(err => {
                                            //     console.log(err);
                                            //     return resolve;
                                            // });
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    return resolve;
                                })
                        }
                        return resolve;
                    })
                    .catch(err => {
                        console.log(err);
                        return reject(err);
                    })
            }
        })
    }




}

module.exports = new ChackingService();