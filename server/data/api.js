const fs = require("fs")

function readItems() {
    return JSON.parse(fs.readFileSync('data/db.json'))
}

function addItem(item) {
    const items = readItems()
    items.push(item)
    fs.writeFileSync('data/db.json', JSON.stringify(items, null, 2))
}

/*
    addItem(myNewCar)
*/

module.exports = {
    readItems,
    addItem
}
