const express = require('express');

const app = express();
const path = require('path');
const url = require('url');
const Item = require('./data/item');
const items = require('./data/list_items');

const session = require('express-session');

const itemsMap = items.reduce((map, obj)=> {
    map[obj.name] = obj;
    return map;
}, {});

function addItemToCart(item,cart) {
    if(!cart[item.name]) {
        cart[item.name] = item;
    }

    cart[item.name].quantity += 1;
}


function getTotal(cart) {
    let total = 0;
    for(let key in cart) {
        const item = cart[key];
        total += item.quantity * item.price;
    }
    return total;
}


app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({extended: true}));
app.use('/css', express.static(path.join(`${__dirname}`, 'views', 'css')));

app.use(session({
    secret: 'my secret value'
}));

app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}`, 'views'));

app.get('/shop', (req, res) => {
    res.render('shop', {
       'products': items 
    });
});

app.post('/addToCart', (req,res)=> {
    const name = req.body.name;

    if(!req.session.cart) {
        req.session.cart = {};
    }

    addItemToCart(itemsMap[name], req.session.cart);
    res.status(303).redirect('/');
});

app.get('/', (req, res)=> {
    res.render('cart', {
        items: req.session.cart,
        total: getTotal(req.session.cart)
    });
});


app.listen(3001);