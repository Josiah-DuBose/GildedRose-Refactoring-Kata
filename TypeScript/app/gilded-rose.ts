const ITEM_TYPES = {
  BRIE: 'Aged Brie',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  HAND: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured',
};

export class Item {
  name: string;
  sellIn: number;
  protected _quality: number;

  public get quality(): number {
    return this._quality;
  }
  public set quality(value: number) {
    this._quality = value;
  }

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this._quality = quality;
  }
}

export class SafeItem extends Item {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality);
  }

  set quality(value: number) {
    this._quality = value >= 0 ? value : 0;
  }

  get quality() {
    return this._quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQualityBrie(item) {
    // Update quality
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    // Update sellIn
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1
    }
  }

  updateQualityBackstage(item) {
    // Update quality
    if (item.quality < 50) {
      item.quality = item.quality + 1
      if (item.sellIn < 11 && item.quality < 50) item.quality = item.quality + 1
      if (item.sellIn < 6 && item.quality < 50) item.quality = item.quality + 1;
    }

    // Update sellIn
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) item.quality = item.quality - item.quality;
  }

  updateQualityDefault(item) {
    if (item.quality > 0) item.quality = item.quality - 1;
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0 && item.quality > 0) item.quality = item.quality - 1
  }

  updateQualityConjured(item) {
    if (item.quality > 0) item.quality = item.quality - 2;
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0 && item.quality > 0) item.quality = item.quality - 2;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item?.name) {
        case ITEM_TYPES.BRIE:
          this.updateQualityBrie(item);
          continue;
        case ITEM_TYPES.BACKSTAGE:
          this.updateQualityBackstage(item);
          continue;
        case ITEM_TYPES.HAND:
          // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
          continue;
        case ITEM_TYPES.CONJURED:
            this.updateQualityConjured(item);
            continue;
        default:
          this.updateQualityDefault(item);
          continue;
      }
    }

    return this.items;
  }
}
