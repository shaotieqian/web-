var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var OrderSchema = new Schema({
	uid: { type: String },
	chkItem: { type: String },
    num: { type: String },
    sum: { type: String },
    canju: { type: String},
    date: { type: String},
    time: { type: String},
    time1: { type: String},
});

OrderSchema.statics = {
	fetch: function(cb){
		return this
		   .find({})
		   .sort("meta.updateAt")
		   .exec(cb)
	},
	findById: function(id, cd){
		return this
		   .findOne({_id: id})
		   .exec(cd)
	}
}

module.exports = OrderSchema;
