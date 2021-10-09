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
    getItemsByDatetime(datetime) {
        const index = data.findIndex(elem => elem.datetime === datetime);
        return data.slice(index + 1);
    },
    addItem(item) {
        item.id = nanoid();
        item.datetime = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        data.push(item);
        this.save();
        return item;
    },
    save() {
        fs.writeFileSync(filename, JSON.stringify(data));
    }
};