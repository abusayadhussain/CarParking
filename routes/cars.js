var express = require("express");
var router = express.Router();
var Car = require("../models/car");


router.get("/cars", function(req, res){
    //get all the cars from the DB
    Car.find({}, function(err, allCars){
        if(err){
            console.log(err);
        } else{
            res.render("index", {cars:allCars});
        }
    });
    
});

router.post("/cars", isLoggedIn, function(req,res){
    var name = req.body.name;
    var model = req.body.model;
    var license = req.body.license;
    var owner = {
        id: req.user._id,
        username: req.user.username
    };
    var newCar = {name: name, model: model, license: license, owner: owner};

    //Create a new car and send it to DB
    Car.create(newCar, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/cars");
        }
    });
    
});

router.get("/cars/new", isLoggedIn, function(req,res){
    res.render("new");
});

//SHOW- show more info about the car that has been parked
router.get("/cars/:id", function(req, res){
    var carId = req.params.id;
    Car.findById(carId, function(err, foundCar){
        if(err){
            console.log(err);
        } else{
            res.render("show", {car:foundCar});
        }
    })
    
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;