const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('front/css'));

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
        res.sendFile(__dirname + '/front/auth/sing_in.html');
});
app.listen(80);
