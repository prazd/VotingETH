var express = require('express');

var app = express();
app.set('view engine', 'ejs');//шаблонизатор

app.get('/',function(req, res){ //request , response
	res.sendFile(__dirname + "/1.html");
});

app.get('/:id', function(req,res){
	res.render('a', {newsId:req.params.id});
});
app.listen(80)
