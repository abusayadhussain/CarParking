var mongoose = require("mongoose");

//Schema Setup
var carSchema = new mongoose.Schema({
    name: String,
    model: String,
    license : String
});

module.exports = mongoose.model("car", carSchema);