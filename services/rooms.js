
const RoomService = require('./../api/components/rooms/service');

class Rooms {
    getRooms(hotelId) {
        return new Promise((resolve, reject) => {

            let l = [];
            RoomService.getAllRooms(hotelId)
                .then(rooms => {
                    // console.log(hotels);
                    for (let i = 0; i < rooms.length; ++i) {
                        l.push({
                            title: rooms[i].name,
                            subtitle: rooms[i].info,
                            url: rooms[i].avatar,
                            alt: rooms[i].id
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
                    return reject('No rooms');
                });
        });
    }


    getRoomIdByName(roomName) {
        return new Promise((resolve, reject) => {
            RoomService.getRoomIdByName(roomName)
                .then(id => {
                    if (!id) {
                        return reject('No such room');
                    }
                    global.RoomId = id;
                    return resolve(id);
                })
                .catch(err => {
                    console.log(err);
                    return reject(err);
                });
        })

    }


    getRoomForDays(roomTypeId, hotelId, days) {
        return new Promise((resolve, reject) => {
            RoomService.getRoomForDays(roomName, hotelId, days)
                .then(id => {
                    if (!id) {
                        return reject('No such room');
                    }
                    global.RoomId = id;
                })
                .catch(err => {
                    console.log(err);
                });
        })
    }
}

module.exports = new Rooms();
