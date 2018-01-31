const Inn = require('../../src/ClassSolution/models/inn');
const Item = require('../../src/ClassSolution/models/item');

describe('Gilded Rose Inn', () => {
  let inn;

  function createInn({ name, sell_in = 10, quality = 10 }) {
    return new Inn([ new Item(name, sell_in, quality) ]);
  }

  function getItem() {
    return inn.items[0];
  }

  beforeEach(() => {
    inn = createInn({ name: 'generic', quality: 1, sell_in: 0 });
  });

  it('reduces sell_in by 1 each day', () => {
    const previousSell_in = getItem().sell_in;
    inn.updateQuality();
    expect(getItem().sell_in).toEqual(previousSell_in - 1);
  });

  it('reduces quality by 1 each day', () => {
    const previousQuality = getItem().quality;
    inn.updateQuality();
    expect(getItem().quality).toEqual(previousQuality - 1);
  });

  assertConjuredQuality({ name: 'foo' });

  describe('when quality is 0', () => {
    beforeEach(() => {
      inn = createInn({ name: 'foo', quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      inn.updateQuality();
      expect(getItem().quality).toEqual(0);
    });
  });

  describe('when sell_in date has passed', () => {
    beforeEach(() => {
      inn = createInn({ name: 'foo', quality: 2, sell_in: 0 });
    });

    it('reduces quality by 2 each day', () => {
      const previousQuality = getItem().quality;
      inn.updateQuality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });
  });

  describe('Aged Brie', () => {
    const name = 'Aged Brie';

    beforeEach(() => {
      inn = createInn({ name, quality: 1, sell_in: 1 });
    });

    it('increases in quality by 1 each day', () => {
      const previousQuality = getItem().quality;
      inn.updateQuality();
      expect(getItem().quality).toEqual(previousQuality + 1);
    });

    describe('when sell_in date has passed', () => {
      const sell_in = 0;

      beforeEach(() => {
        inn = createInn({ name, quality: 1, sell_in });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        inn.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });

      assertConjuredQuality({ name, sell_in });
    });

    assertConjuredQuality({ name });
    assertQualityUpperBound({ name });
  });

  describe('backstage passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    describe('when there are more than 10 days left', () => {
      const sell_in = 11;

      beforeEach(() => {
        inn = createInn({ name, sell_in });
      });

      it('increases in quality by 1 each day', () => {
        const previousQuality = getItem().quality;
        inn.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 1);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 10 or fewer days left', () => {
      const sell_in = 10;

      beforeEach(() => {
        inn = createInn({ name, sell_in });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        inn.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 5 or fewer days left', () => {
      const sell_in = 5;

      beforeEach(() => {
        inn = createInn({ name, sell_in });
      });

      it('increases in quality by 3 each day', () => {
        const previousQuality = getItem().quality;
        inn.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 3);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 0 or fewer days left', () => {
      const sell_in = 0;

      beforeEach(() => {
        inn = createInn({ name, sell_in });
      });

      it('has 0 quality', () => {
        inn.updateQuality();
        expect(getItem().quality).toEqual(0);
      });
    });

    assertQualityUpperBound({ name });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      inn = createInn({ name: 'Sulfuras, Hand of Ragnaros', quality: 80, sell_in: 10 });
    });

    it('does not decrease in quality', () => {
      const previousQuality = getItem().quality;
      inn.updateQuality();
      expect(getItem().quality).toEqual(previousQuality);
    });

    it('does not reduce sell_in date', () => {
      const previousSell_in = getItem().sell_in;
      inn.updateQuality();
      expect(getItem().sell_in).toEqual(previousSell_in);
    });
  });

  // shared examples
  function assertQualityUpperBound({ name }) {
    describe('when quality is at 50 (upper bound)', () => {
      beforeEach(() => {
        inn = createInn({ name, quality: 50, sell_in: 10 });
      });

      it('does not increase', () => {
        inn.updateQuality();
        expect(getItem().quality).toEqual(50);
      });
    });
  }

  function assertConjuredQuality({ name, quality = 10, sell_in = 10 }) {
    const originalQuality = quality;

    describe('when conjured', () => {
      beforeEach(() => {
        inn = new Inn([
          new Item(name, sell_in, quality),
          new Item(`Conjured ${name}`, sell_in, quality),
        ]);
      });

      function getConjuredItem() {
        return inn.items[1];
      }

      it('degrades twice as fast', () => {
        inn.updateQuality();
        const regularDifferenceInQuality = originalQuality - getItem().quality;
        const conjuredDifferenceInQuality = originalQuality - getConjuredItem().quality;
        expect(conjuredDifferenceInQuality).toEqual(2 * regularDifferenceInQuality);
      });
    });
  }
});
