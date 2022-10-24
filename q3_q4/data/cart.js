class Cart {
    _map = new Map();

    addItemToCart(item) {
        if(!this._map[item.name]) {
            this._map[item.name] = item;
        }
        
        this._map[item.name].quantity +=1;
    }

    getItems() {
        return this._map.values();
    }
}

module.exports = Cart;