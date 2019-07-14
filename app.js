var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect('mongodb://localhost:27017/car_parking', {useNewUrlParser: true});    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var carSchema = new mongoose.Schema({
    name: String,
    model: String,
    license : String
});

var Car = mongoose.model("car", carSchema);

// car.create({
//     name: "Hyundai", 
//     model:"Venue"
// }, function(err, car){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Newly created car");
//         console.log(car);
//     }
// });


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

app.listen(3000, function(){
    console.log("The Car Parking Server has started");
})