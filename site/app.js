const express = require('express');
const path = require('path')
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(express.static('front/css'));
app.use(express.static('front/js'));
app.use(bodyParser.urlencoded({ extended: false }))

var con = mysql.createConnection({
	host:'localhost',
	user:'prazd',
	password:'19982468fktr',
	database:'back'
})

con.connect(console.log('DB'))

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

app.post('/reg',(req,res) => {
	var sql = 'insert into id(name,passwd) values(\''+req.body.login+'\',\''+req.body.pass+'\')'
    con.query(sql,(err,result) => {
		if (err) throw err;
		console.log('NICE');
	});
});
app.listen(80);