var mongoose = require("mongoose");
var CarSchema = require("../schemas/car");                                                
var Car = mongoose.model("Car",CarSchema,"car");

module.exports = Car;