const express = require('express');

const app = express();
const path = require('path');
const url = require('url');
const Item = require('./data/item');
const items = require('./data/list_items');

const itemsMap = items.reduce((map, obj)=> {
    map[obj.name] = obj;
    return map;
}, {});

const cart = new Map();


function addItemToCart(item) {
    if(!cart[item.name]) {
        cart[item.name] = item;
    }

    cart[item.name].quantity += 1;
}


function getTotal() {
    let total = 0;
    for(let key in cart) {
        const item = cart[key];
        total += item.quantity * item.price;
    }
    return total;
}


function getItems() {
    return cart;
}


app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({extended: true}));
app.use('/css', express.static(path.join(`${__dirname}`, 'views', 'css')));

app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}`, 'views'));

app.get('/', (req, res) => {
    res.render('shop', {
       'products': items 
    });
});

app.post('/addToCart', (req,res)=> {
    const name = req.body.name;
    addItemToCart(itemsMap[name]);
    res.status(303).redirect('/contents');
});

app.get('/contents', (req, res)=> {
    res.render('cart', {
        items: getItems(),
        total: getTotal()
    });
});


app.listen(3000);