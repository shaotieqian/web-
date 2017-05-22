var _ = require("underscore");
var Menu = require("../models/menu");
var Catetory = require("../models/catetory")

exports.admin = function(req,res){
	res.render("catetory_admin",{
		catetory:{}
	})
}
//adming post menu
exports.save = function(req,res){
	var _catetory = req.body.catetory
	var catetory = new Catetory(_catetory)

	catetory.save(function(err,catetory){
		if(err){
			console.log(err)
		}
		res.redirect("/admin/catetory/list")
	})
}
//catetorylist page
exports.list = function(req,res){
	Catetory.fetch(function(err,catetory){
		if(err){
			console.log(err)
		}
		res.render("catetorylist",{
			catetory:catetory
		});
	});
}

//delete page
exports.del = function(req,res){
	var id = req.query.id;

	if(id){
		Catetory.remove({_id:id},function(err,catetory){
			if(err){
				console.llog(err)
				res.json({success:0})
			}
			else{
				res.json({success:1})
			}
		})
	}
}