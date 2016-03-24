var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var catchPhrases = ['Why I oughta...', 'Nyuk Nyuk Nyuk!', 'Poifect', 'Spread out!', 'Say a few syllables', 'Soilently'];

app.set('view engine', 'jade');
app.set('new options', {layout: true});
app.set('views',__dirname + '/views');

app.get('/stooges/chat', function(req,res,next){

	res.render('chat')
});

io.sockets.on('connection', function(socket){
	var sendChat = function(title, text){
		socket.emit('chat',{
			title: title,
			contents: text
		});
	};

	setInterval(function(){
		var randomIndex = Math.floor(Math.random()*catchPhrases.length)
		sendChat('Stooge', catchPhrases[randomIndex]);
	},5000);

	socket.on('chat', function(data){
		sendChat('You', data.text);
	});
});

app.get('/?', function(req, res){
	res.render('chat')
});

var port = 8080;
server.listen(port);
console.log('listening on port' + port);

