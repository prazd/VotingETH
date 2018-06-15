const express = require('express');
const path = require('path')
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(express.static('front/css'));
app.use(express.static('front/js'));
app.use(bodyParser.urlencoded({ extended: false }))

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
	res.sendFile(__dirname + '/front/reg.html');
});

app.get('/arch.html', (req, res) => {
	res.sendFile(__dirname + '/front/arch.html');
});

app.get('/sing_in.html', (req, res) => {
		res.sendFile(__dirname + '/front/sing_in.html');
});

app.post('/reg',async (req,res) => {
	await console.log(req.body.login)
});



app.listen(80);