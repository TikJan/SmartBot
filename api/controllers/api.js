const express = require('express');


const RoomApi = require('./../components/rooms/api');
// const ProductApi = require('./../components/products/api');


class ApiV1 {
    initialize(app) {

        app.use('/api/rooms', RoomApi);
        // app.use('/api/products', ProductApi);
    };
};

module.exports = new ApiV1();

