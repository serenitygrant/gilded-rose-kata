const ItemFactory = require('../factories/itemFactory');

class Inn {
  constructor(items = []){
    this.items = items;
  }

  updateQuality() {
    this.items
      .map(ItemFactory.createItem)
      .forEach(item => item.update());

    return this.items;
  }
}

module.exports = Inn;
