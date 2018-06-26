const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/mong')

app.set('view engine','ejs')
app.use(express.static('front/css'));
app.use(express.static('front/js'));
app.use(express.static('front/jquery'));

app.use(bodyParser.urlencoded({ extended: false }));       //body-parser

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

app.post('/reg',(req,res)=>{
	var registration = db.reg(req.body.login,req.body.pass)
	registration.then((result)=>{
		if(result.length===0){
			res.redirect('/sing_in.html');
		}
		else{
			res.render('reg',{info:'Пользователь с таким ником уже есть!'})
		}
	})
})


app.post('/sign',(req,res)=>{
	var autorisation = db.sign(req.body.login,req.body.pass)
	autorisation.then((result)=>{
		if(result.length===0){
			res.render('sign',{info:'Такого пользователя не существует!'})
		}
		else if(+result[0]['password']== +req.body.pass){
			res.sendFile(__dirname + '/front/hello.html')
		}
		else{
			res.render('sign',{info:'Неправильный логин или пароль!'})
		}
	})
})

app.listen(8080);