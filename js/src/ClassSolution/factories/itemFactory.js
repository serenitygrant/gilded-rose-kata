const GenericItem = require('./generic');
const AgedBrieItem = require('./agedBrie');
const SulfurasItem = require('./sulfuras');
const BackstagePassItem = require('./backstagePass');

class ItemFactory {
  static createItem(item) {
    if (item.name.includes('Aged Brie')) {
      return new AgedBrieItem(item);
    } else if (item.name.includes('Sulfuras')) {
      return new SulfurasItem(item);
    } else if (item.name.includes('Backstage passes')) {
      return new BackstagePassItem(item);
    } else {
      return new GenericItem(item);
    }
  }
}

module.exports = ItemFactory;
