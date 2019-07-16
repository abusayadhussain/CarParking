var mongoose = require("mongoose");

//Schema Setup
var carSchema = new mongoose.Schema({
    name: String,
    model: String,
    license : String,
    createdAt: { type: Date, default: Date.now},
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

carSchema.statics.getTotalCars = function(){
    return this.aggregate([
        {$count: "carCount"}
    ]);
}

module.exports = mongoose.model("car", carSchema);