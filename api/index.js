const express = require('express');
const cors = require('cors');

const fileDb = require('./fileDb');
const messages = require('./app/messages');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messages);

(async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log('We are live in ' + port);
    });
})();