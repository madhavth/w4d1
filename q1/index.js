const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.post('/', (req, res)=> {

    if(req.body.key) {
    res.cookie(req.body.key, req.body.value, { maxAge: 60 * 1000 });
    }
    res.redirect('back');
});

app.get('/', (req, res) => {
    res.render('add_view_cookie', { cookies: req.cookies});
});


app.listen(3001);