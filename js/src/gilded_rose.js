function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const QUALITY_UPPER_BOUND = 50;
const QUALITY_LOWER_BOUND = 0;

var items = [];

function getQualityDegradeRate() {
  return -1;
}

function getSellInDegradeRate() {
  return -1;
}

function pastSellDate(item) {
  return item.sell_in <= 0;
}

function conjured(item) {
  return item.name.includes('Conjured');
}

function updateSellIn(item) {
  item.sell_in += this.getSellInDegradeRate();
}

function updateItemQuality(item) {
  let qualityChange = this.getQualityDegradeRate();

  if (item.name.includes('Aged Brie')) {
    qualityChange = 1;
  }
  else if (item.name.includes('Backstage passes')) {
    if (item.sell_in <= 5) {
      qualityChange = 3;
    } else if (item.sell_in <= 10) {
      qualityChange = 2;
    } else {
      qualityChange = 1;
    }

    if (this.pastSellDate(item)) {
      item.quality = 0;
      return;
    }
  }

  if (this.pastSellDate(item)) {
    qualityChange *= 2;
  }

  if (this.conjured(item)) {
    qualityChange *= 2;
  }

  const newQuality = item.quality + qualityChange;
  item.quality = Math.max(QUALITY_LOWER_BOUND, Math.min(QUALITY_UPPER_BOUND, newQuality));
}

function update(item) {
  if (item.name.includes('Sulfuras')) {
    return;
  }
  
  this.updateItemQuality(item);
  this.updateSellIn(item);
}

function update_quality() {
  for (let i = 0; i < items.length; i++) {
    this.update(items[i]);
  }
}
