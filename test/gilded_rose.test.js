const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should open gildedRose shop", function() {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(gildedRose.items.length).toBe(0);
  });

  it("should system lowers SellIn & Quality for any item if a day is passed", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("+5 Dexterity Vest");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("should system lowers SellIn & Quality for any item if a day is passed and Quality of an item is never negative", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("+5 Dexterity Vest");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  });

  it("should system not lowers SellIn & Quality for item 'Sulfuras, Hand of Ragnaros' if a day is passed", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

  it("should system lowers SellIn & Quality degrades twice as fast for item once the sell by date has passed", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 7)]);
    let items = gildedRose.updateQuality(); //a day is passed
    expect(items[0].name).toBe("Elixir of the Mongoose");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(5);

    items = gildedRose.updateQuality(); //a day is passed
    expect(items[0].name).toBe("Elixir of the Mongoose");
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(3);
  });

  it("should system lowers SellIn & increase Quality by 1 for item 'Aged Brie' if a day is passed", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);
  });

  it("should system lowers SellIn & increase Quality by 1 for item 'Aged Brie' if a day is passed and Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(49);
  });

  it("should system lowers SellIn & increase Quality by 1 for item 'Backstage passes to a TAFKAL80ETC concert'if a day is passed", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert",  15, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(14);
    expect(items[0].quality).toBe(31);
  });

  it("should system lowers SellIn & increase Quality by 2 for item 'Backstage passes to a TAFKAL80ETC concert'if a day is passed", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(32);
  });

  it("should system lowers SellIn & increase Quality by 3 for item 'Backstage passes to a TAFKAL80ETC concert'if a day is passed", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(23);
  });

  it("should system lowers SellIn & Quality to 0 for item 'Backstage passes to a TAFKAL80ETC concert'after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("should system lowers SellIn & Quality twice as fast as normal items for item 'Conjured' if a day is passed", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Conjured Mana Cake");
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(4);
  });

  it("should system lowers SellIn & Quality twice as fast as normal items for item 'Conjured' if sell by date has passed", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
    let items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Conjured Mana Cake");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(2);

    items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Conjured Mana Cake");
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(0);
  });


});
