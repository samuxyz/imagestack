var express = require('express');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//Log with Morgan
app.use(morgan('dev'));

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Static files
app.use(express.static(__dirname + '/public')); 

//array to store images
var imagesList = [
	{id:0, url:"http://www.curezone.org/upload/Members/New02/nasa1R3107_1000x1000.jpg", like:4500, caption:"NASA picture of our beautful Earth #NASA"},
	{id:1, url:"http://img0.etsystatic.com/il_fullxfull.26370659.jpg", like:3456, caption:"Butterflies and Hurricanes #Muse"},
	{id:2, url:"https://cdn.pastemagazine.com/www/blogs/lists/muradossman-insta-lotd.jpg", like:2367, caption: "Bring me to #Rome"},
	{id:3, url:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Gallet_clamshell_600x600_movement.jpg", like:1245, caption: "Watch mechanics #IWantOneToo!"},
	{id:4, url:"http://fp-racing.fr/117/ferrari-458-italia-sur-circuit.jpg", like:4590, caption: "Top tier car #ferrari #Italy"},
	{id:5, url:"http://blog.esl.it/wp-content/uploads/2015/03/malta-sun-800x800.jpg", like:6000, caption: "Malta Beach #GoGetTanned"}
];

var filestackResponse;
app.route('/gallery')
	.get(function(req, res){
		var imagesListReverse = imagesList.slice();
		res.json(imagesListReverse.reverse());
	})
	.post(function(req,res){
		var image = {
			id : imagesList.length,
			caption: req.body.caption,
			url: req.body.url,
			like: parseInt(Math.random() * 4000 + 1000)
		};
		imagesList = imagesList.concat([image]);
		res.json({ message: "Successfully added!"});

	})
	

app.listen(port);
console.log('listening on port ' + port);