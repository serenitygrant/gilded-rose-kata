const Inn = require('./js/src/ClassSolution/models/inn');
const Item = require('./js/src/ClassSolution/models/item');

const InventoryLog = require('./js/src/ClassSolution/inventoryLog');
const InnUpdater = require('./js/src/ClassSolution/InnUpdater');

const inn = new Inn([
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Sulfuras, Hand of Ragnaros', -1, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
  new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
  new Item('Conjured Mana Cake', 3, 6),
  new Item('Conjured Aged Brie', 2, 10)
]);

const log = new InventoryLog(inn);
const updater = new InnUpdater(inn, log);

updater.passDays(6);
