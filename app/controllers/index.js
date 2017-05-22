var _ = require("underscore");
var Menu = require("../models/menu");
var Catetory = require("../models/catetory")
var Car = require("../models/car")
var Adresss = require("../models/adresss")
var Order = require("../models/order")

//error
exports.error0 = function(req,res){
    res.render("error0");
}
exports.error1 = function(req,res){
    res.render("error1");
}
exports.error2 = function(req,res){
    res.render("error2");
}
exports.error3 = function(req,res){
    res.render("error3");
}
exports.error4 = function(req,res){
    res.render("error4");
}
// index page
exports.index = function(req,res){
    console.log("user in session:");
    console.log(req.session.user);

    res.render("homep");
}
// order page
exports.order = function(req,res){
	Catetory
		.find({})
		.populate({path:"cake",options:{limit:5}})
		.exec(function(err,catetory){
	        if(err){
				console.log(err)
			}
			res.render("goodp.ejs",{
				catetory:catetory,
			});
		})
}
//car page
exports.car = function(req,res){
    Car.find({"uid":req.session.user._id,"cstatus":false}, function (error, car) {
        Adresss.find({"uid":req.session.user._id}, function (error, adresss) {
            res.render('carp',{
                car:car,
                adresss:adresss});
        }); 
    });    
}
//address
exports.adresss = function(req,res){
    Adresss.find({"uid":req.session.user._id}, function (error, adresss) {
        res.render('address',{adresss:adresss});
    });   
}
//个人信息
exports.information = function(req,res){
    var user=req.session.user._id;
    if(user==='58ee44caf652ccb1f8473921'){
        res.render("information")
    }else{
        res.render("information1")
    }
}
//porder
exports.porder = function(req,res){
    Car.find({"uid":req.session.user._id,"cstatus":false}, function (error, car) {
        Adresss.find({"uid":req.session.user._id}, function (error, adresss) {
            Order.find({"uid":req.session.user._id}, function (error, order) {
                res.render('porder.ejs',{
                    car:car,
                    adresss:adresss,
                    order:order});
            }); 
        }); 
    });    
}
//添加商品
exports.addToCar = function(req,res){
    Car.findOne({"uid":req.session.user._id, "cid":req.params.id},function(error,doc){
        //商品已存在 +1
        if(doc){
            Car.update({"uid":req.session.user._id, "cid":req.params.id},{$set : { cquantity : doc.cquantity + 1 }},function(error,doc){
                res.redirect('/order');
            });
        //商品未存在，添加
        }else{
            Menu.findOne({"_id": req.params.id}, function (error, doc) {
                if (doc) {
                    Car.create({
                        uid: req.session.user._id,
                        cid: req.params.id,
                        cname: doc.title1,
                        cposter :doc.poster,
                        ctitle: doc.title2,
                        cprice: doc.price,
                        cquantity : 1
                    },function(error,doc){
                        if(doc){
                            res.redirect('/order');
                        }
                    });
                } else {

                }
            });
        }
    });
}
exports.save = function(req,res){
    var _adresss = req.body.adresss;
    var adresss = new Adresss(_adresss);
    Adresss.create({
                uid: req.session.user._id,
                option: adresss.option,
                option1 :adresss.option1,
                address :adresss.address,
                name: adresss.name,
                telphone: adresss.telphone,
            },function(error,doc){
                        if(error){
                            console.log(error);
                        }
                        res.redirect('/address');
                    });
}

exports.save1 = function(req,res){
    var _order = req.body.order;
    var order = new Order(_order);
    Order.create({
                uid: req.session.user._id,
                cid: req.params.id,
                chkItem: order.chkItem,
                num: order.num,
                canju: order.canju,
                date: order.date,
                time: order.time,
                time1: order.time1,
            },function(error,doc){
                        if(error){
                            console.log(error);
                        }
                        res.redirect('/porder');
                    });
}

exports.save2 = function(req,res){
    var id = req.query.id
    Adresss.update({_id:id},{$set:{moren:1}},function(err,ad){
        if(err){
            console.log(err)
            res.json({success:0})
        }else{
            res.json({success:1})
        }
    });
}
exports.save3 = function(req,res){
    Adresss.update({"uid":req.session.user._id,"moren":"1"},{$set:{"moren":"0"}},function(err,ad){
        if(err){
            console.log(err)
            res.json({success:0})
        }else{
            console.log(1)
            res.json({success:1})
        }
    });
}
exports.save4 = function(req,res){
    console.log(req.body.money)
}
//删除
exports.del = function(req,res){
    var id = req.query.id;
    console.log(id)
    if(id){
        Car.remove({_id:id},function(err,car){
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

exports.del1 = function(req,res){
    var id = req.query.id;
    console.log(id)
    if(id){
        Adresss.remove({_id:id},function(err,adresss){
            if(err){
                console.log(err)
                res.json({success:0})
            }else{
                res.json({success:1})
            }
        })
    }
} 
