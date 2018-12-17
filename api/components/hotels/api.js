const express = require('express');
const HotelRouter = express.Router();

const HotelService = require('./service');



HotelRouter.get('/', (req, res) => {
    let options = {};

    HotelService.getAllHotels(options)
        .then(hotels => {
            res.send(hotels);
        })
        .catch(err => {
            res.send(err);
        })
});





module.exports = RoomRouter;
