
const RoomService = require('./../api/components/rooms/service');


function getRooms(id) {
    return new Promise((resolve, reject) => {

        let l = [];
        RoomService.getAllRooms(id)
            .then(rooms => {
                // console.log(hotels);
                for(let i = 0; i < rooms.length; ++i) {
                    l.push({
                        title: rooms[i].name,
                        subtitle: rooms[i].about,
                        url: rooms[i].photourl,
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
                return  resolve(k);
            })
            .catch(err => {
                console.log(err);
                return reject('No rooms');
            });
    });
}


module.exports = getRooms;
