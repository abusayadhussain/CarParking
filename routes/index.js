var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});



//Auth routes

//Show Register form
router.get("/register", function(req,res){
    res.render("register");
});

//Sign up post route
router.post("/register", function(req,res){
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
router.get("/login", function(req, res){
    res.render("login");
});

//Handling login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/cars",
    failureRedirect: "/login"
}),function(req, res) {

});

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/cars");
});

function isLoggedIn(req,res,next){
    if(User.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;