const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

app.use(session({
    secret: 'this is our secret',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({extended: true}));

app.get('/set', (req, res) => {
    res.render('form', {
        title: 'Question 2 form with cookies'
    })
});

app.get('/', (req,res)=> {

    const name = req.session.name;
    const age = req.session.age;

    res.render('result', {
        name, age
    });
});

app.post('/', (req, res) => {
    req.session['name'] = req.body.name;
    req.session['age'] = req.body.age;
    res.status(303).redirect('/');
});

app.listen(3001);