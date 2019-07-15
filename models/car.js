var mongoose = require("mongoose");

//Schema Setup
var carSchema = new mongoose.Schema({
    name: String,
    model: String,
    license : String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("car", carSchema);