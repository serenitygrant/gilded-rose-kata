describe('Gilded Rose Inn', () => {
  function createItems({ name, sell_in = 10, quality = 10 }) {
    return [ new Item(name, sell_in, quality) ];
  }

  function getItem() {
    return items[0];
  }

  beforeEach(() => {
    items = createItems({ name: 'generic', quality: 1, sell_in: 0 });
  });

  it('reduces sell_in by 1 each day', () => {
    const previousSell_in = getItem().sell_in;
    update_quality();
    expect(getItem().sell_in).toEqual(previousSell_in - 1);
  });

  it('reduces quality by 1 each day', () => {
    const previousQuality = getItem().quality;
    update_quality();
    expect(getItem().quality).toEqual(previousQuality - 1);
  });

  assertConjuredQuality({ name: 'foo' });

  describe('when quality is 0', () => {
    beforeEach(() => {
      items = createItems({ name: 'foo', quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      update_quality();
      expect(getItem().quality).toEqual(0);
    });
  });

  describe('when sell_in date has passed', () => {
    beforeEach(() => {
      items = createItems({ name: 'foo', quality: 2, sell_in: 0 });
    });

    it('reduces quality by 2 each day', () => {
      const previousQuality = getItem().quality;
      update_quality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });
  });

  describe('Aged Brie', () => {
    const name = 'Aged Brie';

    beforeEach(() => {
      items = createItems({ name, quality: 1, sell_in: 1 });
    });

    it('increases in quality by 1 each day', () => {
      const previousQuality = getItem().quality;
      update_quality();
      expect(getItem().quality).toEqual(previousQuality + 1);
    });

    describe('when sell_in date has passed', () => {
      const sell_in = 0;

      beforeEach(() => {
        items = createItems({ name, quality: 1, sell_in });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        update_quality();
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
        items = createItems({ name, sell_in });
      });

      it('increases in quality by 1 each day', () => {
        const previousQuality = getItem().quality;
        update_quality();
        expect(getItem().quality).toEqual(previousQuality + 1);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 10 or fewer days left', () => {
      const sell_in = 10;

      beforeEach(() => {
        items = createItems({ name, sell_in });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        update_quality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 5 or fewer days left', () => {
      const sell_in = 5;

      beforeEach(() => {
        items = createItems({ name, sell_in });
      });

      it('increases in quality by 3 each day', () => {
        const previousQuality = getItem().quality;
        update_quality();
        expect(getItem().quality).toEqual(previousQuality + 3);
      });

      assertConjuredQuality({ name, sell_in });
    });

    describe('when there are 0 or fewer days left', () => {
      const sell_in = 0;

      beforeEach(() => {
        items = createItems({ name, sell_in });
      });

      it('has 0 quality', () => {
        update_quality();
        expect(getItem().quality).toEqual(0);
      });
    });

    assertQualityUpperBound({ name });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      items = createItems({ name: 'Sulfuras, Hand of Ragnaros', quality: 80, sell_in: 10 });
    });

    it('does not decrease in quality', () => {
      const previousQuality = getItem().quality;
      update_quality();
      expect(getItem().quality).toEqual(previousQuality);
    });

    it('does not reduce sell_in date', () => {
      const previousSell_in = getItem().sell_in;
      update_quality();
      expect(getItem().sell_in).toEqual(previousSell_in);
    });
  });

  // shared examples
  function assertQualityUpperBound({ name }) {
    describe('when quality is at 50 (upper bound)', () => {
      beforeEach(() => {
        items = createItems({ name, quality: 50, sell_in: 10 });
      });

      it('does not increase', () => {
        update_quality();
        expect(getItem().quality).toEqual(50);
      });
    });
  }

  function assertConjuredQuality({ name, quality = 10, sell_in = 10 }) {
    const originalQuality = quality;

    describe('when conjured', () => {
      beforeEach(() => {
        items = [
          new Item(name, sell_in, quality),
          new Item(`Conjured ${name}`, sell_in, quality),
        ];
      });

      function getConjuredItem() {
        return items[1];
      }

      it('degrades twice as fast', () => {
        update_quality();
        const regularDifferenceInQuality = originalQuality - getItem().quality;
        const conjuredDifferenceInQuality = originalQuality - getConjuredItem().quality;
        expect(conjuredDifferenceInQuality).toEqual(2 * regularDifferenceInQuality);
      });
    });
  }
});
