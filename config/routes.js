var Index = require("../app/controllers/index")
var User = require("../app/controllers/user")
var Menu = require("../app/controllers/menu")
var Catetory = require("../app/controllers/catetory")

module.exports = function(app){

//handle user
	app.use(function(req,res,next){
		var _user = req.session.user
		app.locals.user = _user
		next()
	});

//index 
	app.get("/",Index.index)
	app.get("/order",Index.order)
	app.get("/car",User.signinRequired,Index.car)
	app.get("/porder",User.signinRequired,Index.porder)
	app.get("/information",User.signinRequired,Index.information)
	app.get("/address",User.signinRequired,Index.adresss)
	app.post("/car/new",User.signinRequired,Index.save4)
	app.post("/porder/new",User.signinRequired,Index.save1)
	app.post("/adresss/new",User.signinRequired,Index.save)
	app.post("/adresss/moren",User.signinRequired,Index.save2)
	app.post("/adresss/moren/new",User.signinRequired,Index.save3)
	app.get("/addToCar/:id",User.signinRequired,Index.addToCar)
	app.get("/error0",Index.error0)
	app.get("/error1",Index.error1)
	app.get("/error2",Index.error2)
	app.get("/error3",Index.error3)
	app.get("/error4",Index.error4)
	app.delete("/car/list",Index.del)
	app.delete("/address",Index.del1)

//user
	app.post("/user/signup",User.signup)
	app.post("/user/signin",User.signin)
	app.get("/logout",User.logout)
	app.get("/admin/user/list",User.signinRequired,User.adminRequired,User.list)
	app.delete("/user/list",User.signinRequired,User.adminRequired,User.del)

//menu
	app.get("/cake/:id",Menu.purchase)
	app.get("/admin",User.signinRequired,User.adminRequired,Menu.admin)
	app.get("/admin/update/:id",User.signinRequired,User.adminRequired,Menu.update)
	app.post("/admin/cake/new",User.signinRequired,User.adminRequired,Menu.savePoster,Menu.save)
	app.get("/admin/cake/list",User.signinRequired,User.adminRequired,Menu.list)
	app.delete("/cake/list",User.signinRequired,User.adminRequired,Menu.del)

//catetory
    app.get("/admin/catetory",User.signinRequired,User.adminRequired,Catetory.admin)
    app.post("/admin/catetory/new",User.signinRequired,User.adminRequired,Catetory.save)
    app.get("/admin/catetory/list",User.signinRequired,User.adminRequired,Catetory.list)
    app.delete("/catetory/list",User.signinRequired,User.adminRequired,Catetory.del)
}