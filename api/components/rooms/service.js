const RoomDao = require('./private/dao');


class RoomService {
    getAllRooms(id) {
        return new Promise((resolve, reject) => {
            console.log(id);
            RoomDao.getAllRoomTypes(id)
                .then(rooms => {
                    console.log(rooms);
                    return resolve(rooms);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };


    getRoomIdByName(name, id) {
        return RoomDao.getRoomIdByName(name, id);
    }
}

module.exports = new RoomService();
