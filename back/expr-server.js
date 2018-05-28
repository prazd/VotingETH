var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send('Home');
})
app.get('/:id', function(req,res){
	res.send('id-'+req.params.id);
});
app.listen(80)
