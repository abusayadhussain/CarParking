var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var cars = [
    {name: "BMV", model:"M340"},
    {name: "2020 Acura" , model: "TLX"},
    {name: "2020 Hyundai" ,model: "Elantra"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/cars", function(req, res){
    

    res.render("cars", {cars:cars});
});

app.post("/cars", function(req,res){
    var name = req.body.name;
    var model = req.body.model;
    var newCar = {name: name, model: model};

    cars.push(newCar);
    res.redirect("/cars");
});

app.get("/cars/new", function(req,res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("The Car Parking Server has started");
})