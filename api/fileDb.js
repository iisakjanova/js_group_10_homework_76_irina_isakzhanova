const fs = require('fs');
const {nanoid} = require('nanoid');
const dayjs = require('dayjs');

const filename = './db.json';
let data = [];

module.exports = {
    async init() {
        if (fs.existsSync(filename)){
            try {
                const fileContents = await fs.promises.readFile(filename, 'utf8');
                data = JSON.parse(fileContents);
            } catch (e) {
                console.error(e);
            }
        }
    },
    getItems(maxQty) {
        return data.slice(-maxQty);
    },
    getItemsSinceDatetime(datetime) {
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