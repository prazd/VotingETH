var http = require('http');
var fs = require('fs');

server = http.createServer(function(req, res){
	if(req.url === '/'){
	res.writeHead(200,{'Content-Type':'text/plain; charset=utf8'});
	res.end('Hello');}
        else if(req.url === '/1'){
	res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
	fs.createReadStream(__dirname + '/1.html').pipe(res);
	}
        else if(req.url === '/2'){
	res.writeHead(200,{'Content-Type':'text/html; charset=utf8'});
	fs.createReadStream(__dirname + '/2.html').pipe(res);
	}
});
server.listen(80);
