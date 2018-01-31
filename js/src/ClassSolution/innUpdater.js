class InnUpdater {
  constructor(inn, log) {
    this.inn = inn;
    this.inventoryLog = log;
  }

  passDays(numDays) {
    console.log('On Day 1');
    this.inventoryLog.logInventory();

    [...Array(numDays)].forEach((_, idx) => {
      const dayNum = idx + 1;
      this.passDay(dayNum)
    });
  }

  passDay(dayNum) {
    console.log(`After Day ${dayNum}`);

    this.inn.updateQuality();
    this.inventoryLog.logInventory();
  }
}

module.exports = InnUpdater;
