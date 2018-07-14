const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/mong')

app.set('view engine','ejs')
app.use(express.static('front/css'));
app.use(express.static('front/js'));
app.use(express.static('front/jquery'));
app.use(bodyParser.urlencoded({ extended: false }));           //body-parser

const urls = ['index.html','/','/main_page.html','/abt.html','/dela.html','/arch.html']
const ejs_res = {'/reg.html':'reg','/sing_in.html':'sign'}
const ejs_req = ['/reg.html','/sing_in.html']

//html
app.get(urls,(req,res)=>{
	if(urls.indexOf(req.url)){
		res.sendFile(__dirname + '/front'+req.url)
	}	
});

//ejs
app.get(ejs_req,(req,res)=>{
	res.render(ejs_res[req.url],{info:''});
});

//registration
app.post('/reg',(req,res)=>{
	let registration = db.reg(req.body.login,req.body.pass);
	registration
	       .then(()=>{
			   res.redirect('/sing_in.html');
		   }).catch((err)=>{
			   res.render('reg',{info:err});
		   });
});

//sign in
app.post('/sign',(req,res)=>{
	let autorisation = db.sign(req.body.login,req.body.pass)
	autorisation
	      .then(()=>{
			  res.sendFile(__dirname+'/front/hello.html')
		  }).catch((err)=>{
			  res.render('sign',{info:err});
		  })
})

app.listen(8080);