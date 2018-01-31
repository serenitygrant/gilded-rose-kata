class InventoryLog {
  constructor(inn) {
    this.inn = inn;
  }

  logInventory() {
    this.inn.items.forEach(this.logItem);
  }

  logItem({ name, quality, sell_in }, idx) {
    console.log(`
      Item ${idx}:
      \tName: ${name}
      \tQuality: ${quality}
      \tBest Before: ${sell_in}
    `);
  }
}

module.exports = InventoryLog;
