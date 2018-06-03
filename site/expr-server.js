var express = require('express');
var path = require('path')
var app = express();

app.use(express.static('front/css'));


app.get('/',function(req, res){
	res.sendFile(__dirname + '/front/main_page.html');
});
app.get('/main_page.html',function(req, res){
	res.sendFile(__dirname + '/front/main_page.html');
});
app.get('/abt.html', function(req, res){
	res.sendFile(__dirname + '/front/abt.html');
});
app.get('/dela.html', function(req, res){
	res.sendFile(__dirname + '/front/dela.html');
});
app.get('/reg.html', function(req, res){
	res.sendFile(__dirname + '/front/reg.html');
});
app.get('/arch.html', function(req, res){
	res.sendFile(__dirname + '/front/arch.html');
});

app.get('/sing_in.html', function(req, res){
	res.sendFile(__dirname + '/front/sing_in.html');

});
app.listen(80);
