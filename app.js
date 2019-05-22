require('dotenv-extended').load();

let express = require('express');

// Web app
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



let bot = require('./bot/index');
app.post('/api/messages', bot.listen());


let port = 3000;
app.listen(port, () => {
    console.log('Web Server listening on port %s', port);
});
