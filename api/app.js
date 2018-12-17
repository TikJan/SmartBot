const express = require('express');
const body_parser = require('body-parser');


const app = express();
app.listen(3000);


app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));


let api = require('./controllers/api');
api.initialize(app);