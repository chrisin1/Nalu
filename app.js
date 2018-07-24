const express = require('express');
const app = express();
const controller = require('./config/controllers/controller');
const port = 3000;
const mysql = require('mysql');
const myDb = require('./db');

const session =    require('express-session')
const bodyParser = require('body-parser')
const passport   = require('passport')
const env        = require('dotenv').load()

const flash = require('connect-flash');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

//Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport,models.user);





//Setting Template Engine
app.set('view engine', 'ejs');

// Static File Management
app.use(express.static('./public'));

controller(app,myDb(mysql), passport);

//Sync Database
models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!")
});

//Listening to File
app.listen(port);
console.log('You are listening to Port ' + port + '!');
