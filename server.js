// server.js

// set up ======================================================================
// get all the tools we need
var express   = require('express'),
app           = express(),
port          = process.env.PORT || 8080,
mongoose      = require('mongoose'),
passport      = require('passport'),
flash         = require('connect-flash'),
morgan        = require('morgan'),
cookieParser  = require('cookie-parser'),
bodyParser    = require('body-parser'),
session       = require('express-session'),
configDB      = require('./config/database.js');
//bson          = require('../browser_build/bson');;

// configuration ===============================================================
mongoose.connect(configDB.url, function(err, db){
  if(err)
    console.log(err);
  else
    console.log('Succesfully connected to Mongo');
}); // connect to the database

// require('./config/passport')(passport);  // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());  // read cookies (needed for auth)
app.use(bodyParser());  // get information from html forms

app.set('view engine', 'ejs');  // set up ejs for templating
app.use(session({ secret : 'thisisasupersecretkey'}));  // session secret
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport);  // load our routes and pass in our app fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Listening on port : ' + port);
