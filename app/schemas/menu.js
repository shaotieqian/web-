var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MenuSchema = new Schema({
	poster:String,
	title1:String,
	title2:String,
	type:String,
	material:String,
	taste:String,
	price:String,
	catetory:[{
		type: ObjectId,
		ref: "Catetory"
	}],
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

MenuSchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
})

MenuSchema.statics = {
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

module.exports = MenuSchema;