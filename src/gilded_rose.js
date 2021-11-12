class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQualityChecks(quality, value){
    quality = quality + value;

    if(quality < 0){ //The Quality of an item is never negative
      quality = 0;
    }
    if(quality >= 50){ //The Quality of an item is never more than 50
      quality = 49;
    }

    return quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name != 'Sulfuras, Hand of Ragnaros'){ //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        item.sellIn = item.sellIn - 1;

        //Quality Checks
        if (item.name === 'Backstage passes to a TAFKAL80ETC concert') { //"Backstage passes" increases in Quality as its SellIn value approaches;
          if(item.sellIn < 0){ //Quality drops to 0 after the concert
            item.quality = 0;
          }
          else if(item.sellIn <= 5){ //Quality increases by 3 when there are 5 days or less but
            item.quality = this.updateQualityChecks(item.quality,  3);
          }
          else if(item.sellIn <= 10){ //Quality increases by 2 when there are 10 days or less
            item.quality = this.updateQualityChecks(item.quality,  2);
          }
          else{
            item.quality = this.updateQualityChecks(item.quality,  1);
          }
        }
        else if (item.name === 'Aged Brie') { //"Aged Brie" actually increases in Quality the older it gets
          item.quality = this.updateQualityChecks(item.quality,  1);
        }
        else if(item.name === "Conjured Mana Cake"){ //"Conjured" items degrade in Quality twice as fast as normal items
          if (item.sellIn < 0) { //Once the sell by date has passed, Quality degrades twice as fast
            item.quality = this.updateQualityChecks(item.quality,  -4);
          }
          else{
            item.quality = this.updateQualityChecks(item.quality,  -2);
          }
        }
        else{
          if (item.sellIn < 0) { //Once the sell by date has passed, Quality degrades twice as fast
            item.quality = this.updateQualityChecks(item.quality,  -2);
          }
          else{
            item.quality = this.updateQualityChecks(item.quality,  -1);
          }
        }
      }
      
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
