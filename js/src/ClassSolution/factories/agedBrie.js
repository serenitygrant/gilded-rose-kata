const GenericItem = require('./generic');

class AgedBrieItem extends GenericItem {
  getQualityDegradeRate() {
    return 1;
  }
}

module.exports = AgedBrieItem;
