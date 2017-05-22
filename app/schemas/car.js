var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CarSchema = new Schema({
	uid: { type: String },
    cid: { type: String },
    cname: { type: String },
    cposter: { type: String},
    ctitle: { type: String },
    cprice: { type: String },
    cquantity: { type: Number },
    csubtotal: { type: Number },
    cstatus : { type: Boolean, default: false  }
});

CarSchema.statics = {
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

module.exports = CarSchema;
