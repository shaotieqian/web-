var mongoose = require("mongoose");
var AdresssSchema = require("../schemas/adresss");                                                
var Adresss = mongoose.model("Adresss",AdresssSchema,"adresss");

module.exports = Adresss;