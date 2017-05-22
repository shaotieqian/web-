var User = require("../models/user");

//signup
exports.signup = function(req,res){
	var _user = req.body.user;
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			console.log("已有账号");
			return res.redirect("/error2");
		}else{
			var user = new User(_user);

			user.save(function(err,user){
				if(err){
					console.log(err);
					return res.redirect("/");
		        }
		        return res.redirect("/");
	        })
		}
	})
}

//signin
exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password

	User.findOne({name: name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			console.log("未注册的账号");
			return res.redirect("/error0");
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);

			}
			if(isMatch){
				req.session.user = user
 
				return res.redirect("/");
			}
			else{
				console.log("密码错误");

				return res.redirect("/error1");
			}
		});
	});
}

//logout
exports.logout = function(req,res){
	delete req.session.user
	res.redirect("/");
}

//userlist page
exports.list = function(req,res){
	User.fetch(function(err,user){
		if(err){
			console.log(err)
		}
		res.render("userlist",{
			user:user
		});
	});
}

// midware for user
exports.signinRequired = function(req,res,next){
	var user = req.session.user

	if(!user){
		return res.redirect("/error3");
	}
	next()
}

exports.adminRequired = function(req,res,next){
	var user = req.session.user

	if(user.role >= 1){
		next()
	}else{
		res.redirect("/error4")
	}
}

exports.del = function(req,res){
	var id = req.query.id;

	if(id){
		User.remove({_id:id},function(err,user){
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