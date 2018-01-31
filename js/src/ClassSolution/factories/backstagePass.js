const GenericItem = require('./generic');

class BackstagePassItem extends GenericItem {
  updateQuality() {
    if (this.pastSellDate()) {
      this.item.quality = 0;
      return;
    }

    super.updateQuality();
  }

  getQualityDegradeRate() {
    if (this.item.sell_in <= 5) {
      return 3;
    } else if (this.item.sell_in <= 10) {
      return 2;
    } else {
      return 1;
    }
  }
}

module.exports = BackstagePassItem;
