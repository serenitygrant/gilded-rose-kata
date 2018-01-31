class GenericItem {
  constructor(item) {
    this.item = item;

    this.QUALITY_UPPER_BOUND = 50;
    this.QUALITY_LOWER_BOUND = 0;
  }

  update() {
    this.updateQuality();
    this.updateSellIn();
  }

  updateQuality() {
    let qualityChange = this.getQualityDegradeRate();

    if (this.pastSellDate()) {
      qualityChange *= 2;
    }

    if (this.conjured()) {
      qualityChange *= 2;
    }

    const newQuality = this.item.quality + qualityChange;
    this.item.quality = Math.max(this.QUALITY_LOWER_BOUND, Math.min(this.QUALITY_UPPER_BOUND, newQuality));
  }

  updateSellIn() {
    this.item.sell_in += this.getSellInDegradeRate();
  }

  getQualityDegradeRate() {
    return -1;
  }

  getSellInDegradeRate() {
    return -1;
  }

  conjured() {
    return this.item.name.includes('Conjured');
  }

  pastSellDate() {
    return this.item.sell_in <= 0;
  }
}

module.exports = GenericItem;
