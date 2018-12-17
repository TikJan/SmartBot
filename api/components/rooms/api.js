const express = require('express');
const RoomRouter = express.Router();

const RoomService = require('./service');



RoomRouter.get('/', (req, res) => {
    console.log('all');
    let options = {};

    RoomService.getAllRooms(options)
        .then(rooms => {
            res.send(rooms);
        })
        .catch(err => {
            res.send(err);
        })
});

//todo es funkcyan chi tenum
RoomRouter.get('/:id', (req, res) => {
    console.log('id');
    let roomId = req.params.id;


    RoomService.getRoomInfo(roomId)
        .then(room => {
            res.send(room);
        })
        .catch(err => {
            res.send(err);
        });
});




module.exports = RoomRouter;