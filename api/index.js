const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const fileDb = require('./fileDb');
const messages = require('./app/messages');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/messages', messages);

fileDb.init();

app.listen(port, () => {
    console.log('We are live in ' + port);
});