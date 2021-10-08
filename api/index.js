const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.post('/messages', (req, res) => {
    if (!req.body.author || !req.body.message) {
        res.status(400).send({"error": "Author and message must be present in the request"});
    } else {
        res.send(req.body);
    }
});

app.listen(port, () => {
    console.log('We are live in ' + port);
});