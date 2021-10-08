const fs = require('fs');
const {nanoid} = require('nanoid');
const dayjs = require('dayjs');

const filename = './db.json';
let data = [];

module.exports = {
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