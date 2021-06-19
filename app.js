const express = require("express");
const mongoose = require("mongoose");
// const autoIncrementFactory = require('mongoose-sequence');
// const autoIncrement = require('mongoose-sequence')(mongoose);

const layouts = require("express-ejs-layouts");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");



const db = require('./config/db');
const PORT = process.env.PORT || 5000;


const app = express();

require("./config/passport")(passport);

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(layouts);
app.set('view engine', 'ejs');



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error'),
    res.locals.session = req.session
    next();
})

const routes = require("./routes/index.route");
app.use(routes);

mongoose.connect(db.mongoUrl, {useNewUrlParser: true, useFindAndModify: false})
.then(() => {
    console.log('DB connected');
    // const autoIncrement = AutoIncrementFactory(connection);
})
.catch(error =>  console.log(error))


app.listen(PORT, () => {
    console.log("server started")
})

