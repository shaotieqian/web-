var mongoose = require("mongoose");
var MenuSchema = require("../schemas/menu");                                                
var Menu = mongoose.model("Menu",MenuSchema,"menu");

module.exports = Menu;