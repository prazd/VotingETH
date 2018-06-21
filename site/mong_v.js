const express = require('express');
const path = require('path');
const app = express();
const mongo = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine','ejs')
app.use(express.static('front/css'));
app.use(express.static('front/js'));
app.use(express.static('front/jquery'));

app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongodb
mongo.connect('mongodb://localhost/users',(err,db)=>{
if(err) throw err;
console.log('connect to mdb')
});
//Schema
var Schema = mongo.Schema;
var userSchema = new Schema({
    login:String,
    password:String
});
//model
var user = mongo.model('user',userSchema);

app.get('/',(req, res) => {
	res.sendFile(__dirname + '/front/main_page.html');
});

app.get('/main_page.html',(req, res) => {
	res.sendFile(__dirname + '/front/main_page.html');
});

app.get('/abt.html', (req, res) => {
	res.sendFile(__dirname + '/front/abt.html');
});

app.get('/dela.html', (req, res) => {
	res.sendFile(__dirname + '/front/dela.html');
});

app.get('/reg.html', (req, res) => {
	res.render('reg',{info:''});
});

app.get('/arch.html', (req, res) => {
	res.sendFile(__dirname + '/front/arch.html');
});

app.get('/sing_in.html', (req, res) => {
		res.render('sign',{info:''});
});

app.post('/reg',(req,res) => {
	var lp = new user({
		login:req.body.login,
		password:req.body.pass
	});
	var reg_query = user.findOne({login:req.body.login},(err,doc)=>{
		if(err) throw err;

		if(doc === null){
			lp.save();
			res.redirect('/sing_in.html');
		}
		else{
			res.render('reg',{info:'Пользователь с таким ником уже есть!'})
		}
	});
});
app.post('/sign',(req,res) => {
	var sign_query = user.findOne({login:req.body.login},(err,doc) =>{
		if(err) throw err;
		if(doc === null){
			res.render('sign',{info:'Такого пользователя не существует!'})
		}
		else{
			if(+doc['password'] == +req.body.pass){
			res.sendFile(__dirname + '/front/hello.html')
			}
			else{
			    res.render('sign',{info:'Неправильный логин или пароль!'})
			}
		}
		console.log(doc)
});});
app.listen(80);