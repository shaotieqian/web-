var _ = require("underscore");
var Catetory = require("../models/catetory");
var Menu = require("../models/menu");
var fs = require("fs");
var path = require("path");

//detail page
exports.purchase = function(req,res){
	var id = req.params.id;

	Menu.findById(id,function(err,menu){
		res.render("purchasep",{
			menu:menu
		});
	});
}

// admin page
exports.admin = function(req,res){
	Catetory.find({},function(err,catetory){
		res.render("admin",{
			catetory:catetory,
		    menu:{}
	    });

	})
}

// admin update page
exports.update = function(req,res){
	var id = req.params.id;

	if(id){
		Menu.findById(id,function(err,menu){
			Catetory.find({},function(err,catetory){
				res.render("admin",{
					menu:menu,
					catetory:catetory
				})
			})
		})
	}
}

//admin img
exports.savePoster = function(req, res, next){
	var posterData = req.files.uploadPoster
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename

	if(originalFilename){
		// 有图片上传
		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster = timestamp + '.' + type
			var newPath = path.join(__dirname, '../../public/upload/'+poster)
			fs.writeFile(newPath, data,function(err){
				// 将文件名传到req里
				req.poster = poster
				next()
			})
		})
	}
	else{
		next()
	}

}

//adming post menu
exports.save = function(req,res){
	var id = req.body.menu._id;//menu._id not fuond
	var menuObj = req.body.menu;
	var _menu 
    
    if(req.poster){
    	menuObj.poster = req.poster
    }

	if(id){
		Menu.findById(id,function(err,menu){
			if(err){
				console.log(err)
			}

			_menu = _.extend(menu,menuObj)
			_menu.save(function(err,menu){
				if(err){
					console.log(err);
				}
				res.redirect("/cake/"+menu._id);
			});
		}) ;
	}
	else{
		_menu = new Menu(menuObj);

        var catetoryId = menuObj.catetory;
        var catetoryName = menuObj.catetoryName;

		_menu.save(function(err,menu){
			if(err){
				console.log(err);
			}

			if(catetoryId){
				Catetory.findById(catetoryId,function(err,catetory){
					catetory.cake.push(menu._id);

					catetory.save(function(err,catetory){
						res.redirect("/cake/"+menu._id)
					})
				})
			}else if(catetoryName){
				var catetory = new Catetory({
					name:catetoryName,
					cake:[menu._id]
				})
				catetory.save(function(err,catetory){
					menu.catetory = catetory._id
                    menu.save(function(err,catetory){
					    res.redirect("/cake/"+menu._id)
					})
				})

			}
	    })
	}
}

//list page
exports.list = function(req,res){
	Menu.fetch(function(err,menu){
		if(err){
			console.log(err)
		}
		res.render("list",{
			menu:menu
		});
	});
}

//delete page
exports.del = function(req,res){
	var id = req.query.id;

	if(id){
		Menu.remove({_id:id},function(err,menu){
			if(err){
				console.log(err)
				res.json({success:0})
			}
			else{
				res.json({success:1})
			}
		})
	}
}
