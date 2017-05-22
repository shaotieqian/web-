var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AdresssSchema = new Schema({
	uid:String,
	moren:String,
	option:String,
	option1:String,
	address:{
		unique:true,
		type:String,
		required: true
	},
	name:{
		unique:true,
		type:String,
		required: true
	},
    telphone:{
    	type:String,
    	required: true
    },
    meta:{
    	createAt:{
    		type:Date,
    		default:Date.now()
    	},
    	updateAt:{
    		type:Date,
    		default:Date.now()
    	}
    }
});
AdresssSchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
})
AdresssSchema.statics = {
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

module.exports = AdresssSchema;
