var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");//caidan not fuond
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var ejs = require("ejs");
var port = process.env.PORT || 80;

var app = express();

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/xo");

app.set("views","./app/views");
app.engine("html",ejs.__express);
app.set("view engine","html");
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-multiparty')());
app.use(cookieParser());
app.use(session({
	secret:"xo",
	store:new MongoStore({
		url:"mongodb://localhost:27017/xo",
		collection:"session"
	}),
	resave:false,
	saveUninitilized:true
}));

app.use(bodyParser.json());//_id cant read
app.use(bodyParser.urlencoded({extended:true}));

app.locals.moment = require("moment");
app.listen(port);

console.log(port+"port");

require("./config/routes")(app)