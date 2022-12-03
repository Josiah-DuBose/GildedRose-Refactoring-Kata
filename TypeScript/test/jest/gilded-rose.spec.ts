import { Item, GildedRose } from '@/gilded-rose';
const tests = require('../tests.json');

describe('Gilded Rose', () => {
  for (const test of tests) {
    it(JSON.stringify(test), ()=> {
      const {name,
        sellIn,
        quality,
        outQuality,
        outSellIn
      } = test
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(outSellIn);
      expect(items[0].quality).toEqual(outQuality);
    });
  }


  // it('generate tests', () => {
    /**
     * generates characterization tests for code behavior.
     */
  //   const names: string[] = [
  //     'Aged Brie',
  //     'Backstage passes to a TAFKAL80ETC concert',
  //     'Sulfuras, Hand of Ragnaros',
  //     'default'
  //   ];

  //   const minSellIn: number = -1;
  //   const maxSellIn: number = 12;
  //   const minQuality: number = -1;
  //   const maxQuality: number = 51;
  //   const tests: Object[] = [];

  //   for(const name of names) {
  //     for (let sellIn = minSellIn; sellIn < maxSellIn; sellIn++) {
  //       for (let quality = minQuality; quality < maxQuality; quality++) {
  //         const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  //         const items = gildedRose.updateQuality();

  //         const outSellIn: number = items[0].sellIn;
  //         const outQuality: number = items[0].quality;

  //         tests.push({
  //           name,
  //           sellIn,
  //           quality,
  //           outQuality,
  //           outSellIn
  //         });
  //       }
  //     }
  //   }

  //   console.log(JSON.stringify(tests));
  // });
});
