var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require("express-flash") ; 
const session = require("express-session") ; 
var logger = require('morgan');
var layouts = require("express-ejs-layouts") ; 
var mongoose = require("mongoose") ; 
var dotenv = require("dotenv") ; 
const passport = require("passport") ; 
const ejs = require("ejs");
const initializeLocalStrategy = require("./utils/passportLocalStrategy") ; 
const cors = require("cors");
initializeLocalStrategy(passport) ; 
dotenv.config() ; 


mongoose.connect("mongodb://localhost:27017/shopping-cart",{
  useNewUrlParser : true, 
  useUnifiedTopology : true , 
  useFindAndModify : true 
}).then((result) => { 
  console.log("db connected") ;
})
.catch(err => { 
  console.log(err.message) ; 
})

var indexRouter = require('./routes/shop/index');
var usersRouter = require('./routes/user/users');

var app = express();

// view engine setup
app.use(cors()) ; 
app.use(layouts) ; 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : process.env.ACCESS_TOKEN_SECRET , 
  resave : false , 
  saveUninitialized : false 
}))
app.use(flash());
app.use((req ,res , next) => { 
  res.locals.success_msg = req.flash("success_msg") ; 
  res.locals.error_msg = req.flash("error_msg") ;
  res.locals.error = req.flash("error") ;
  res.locals.errors = req.flash("errors") ;
  res.locals.login = req.flash("login") ; 
  res.locals.cart = req.flash("cart") ;
  next(); 
})
app.use(passport.initialize())
app.use(passport.session()) ; 



app.use('/shop', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let cart = req.session.cart ; 
  res.status(err.status || 500);
  res.render('error' , {
    title : "error" , 
    cart 
  });
});

module.exports = app;
