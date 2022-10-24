class Item {
    constructor(name, price, quantity=0) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

module.exports = Item;