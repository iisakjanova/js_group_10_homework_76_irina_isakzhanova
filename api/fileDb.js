const fs = require('fs');
const {nanoid} = require('nanoid');
const dayjs = require('dayjs');

const filename = './db.json';
let data = [];

module.exports = {
    init() {
        try {
            const fileContents = fs.readFileSync(filename);
            data = JSON.parse(fileContents);
        } catch (e) {
            data = [];
        }
    },
    getItems(maxQty) {
        return data.slice(-maxQty);
    },
    addItem(item) {
        item.id = nanoid();
        item.datetime = dayjs().format();
        data.push(item);
        this.save();
        return item;
    },
    save() {
        fs.writeFileSync(filename, JSON.stringify(data));
    }
};