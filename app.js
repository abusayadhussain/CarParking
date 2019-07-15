var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Car           = require("./models/car"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

var carRoutes   = require("./routes/cars"),
    indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/car_parking', {useNewUrlParser: true});    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Passport Configuration
app.use(require("express-session")({
    secret: "Code for 12 hours is tiring but pleasing",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(carRoutes);

app.listen(3000, function(){
    console.log("The Car Parking Server has started");
});