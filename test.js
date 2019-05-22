const dialogFlow = require('./services/dialogflow');

dialogFlow.get('I want an econom room since 28 Feb to 3 Mar in Bali.')
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});