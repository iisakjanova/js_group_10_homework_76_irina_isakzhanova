const express = require('express');
const router = express.Router();

const fileDb = require('../fileDb');

router.post('/', (req, res) => {
    if (!req.body.author || !req.body.message) {
        res.status(400).send({"error": "Author and message must be present in the request"});
    } else {
        const newMessage = fileDb.addItem({
            message: req.body.message,
            author: req.body.author,
        });

        res.send(newMessage);
    }
});

router.get('/', (req, res) => {
    const messages = fileDb.getItems(30);
    res.send(messages);
});


module.exports = router;