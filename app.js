var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Car           = require("./models/car"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

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

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/cars", function(req, res){
    //get all the cars from the DB
    Car.find({}, function(err, allCars){
        if(err){
            console.log(err);
        } else{
            res.render("index", {cars:allCars});
        }
    });
    
});

app.post("/cars", function(req,res){
    var name = req.body.name;
    var model = req.body.model;
    var license = req.body.license;
    var newCar = {name: name, model: model, license: license};

    //Create a new car and send it to DB
    Car.create(newCar, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/cars");
        }
    });
    
});

app.get("/cars/new", function(req,res){
    res.render("new");
});

//SHOW- show more info about the car that has been parked
app.get("/cars/:id", function(req, res){
    var carId = req.params.id;
    Car.findById(carId, function(err, foundCar){
        if(err){
            console.log(err);
        } else{
            res.render("show", {car:foundCar});
        }
    })
    
});

//Auth routes

//Show Register form
app.get("/register", function(req,res){
    res.render("register");
});

//Sign up post route
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/cars");
        });
    });
});

//Show login form 
app.get("/login", function(req, res){
    res.render("login");
});

//Handling login logic
app.post("/login", passport.authenticate("local", 
{
    successRedirect: "/cars",
    failureRedirect: "/login"
}),function(req, res) {

});

app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/cars");
});

function isLoggedIn(req,res,next){
    if(User.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("The Car Parking Server has started");
});