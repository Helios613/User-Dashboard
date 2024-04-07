require('dotenv').config();

const connectDB = require('./server/config/db');
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
//const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 4000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(cookieParser('SecretStringForCookies'));

//express session
app.use(
    session({
        secret: 'SecretStringForCookies',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 //1 week
        },
    })
);

app.use(flash());

app.use(express.static('public')); 
app.set('view engine', 'ejs');
app.set("views", "./views");



//app.use(expressLayout);
//app.set('layout', './layouts/main');
//app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/routes'))

// handle 404
app.get('*', (req, res)=> {
    res.status(404).render('404');
})

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
});