var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(path.join('/home/prazd/ethereum/front','css')))
app.get('/',function(req, res){ 
	res.sendFile('/home/prazd/ethereum/front/new.html');
});

//app.get('/:id', function(req,res){
//	res.render('a', {newsId:req.params.id});
//});
//
app.listen(80)
