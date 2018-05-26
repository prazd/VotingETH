let http = require('http'),
let fs = require('fs');

http.createServer(function(request, response){
  fs.readFile('index.html', {encoding: 'utf8'}, function(err, file){});
}).listen(80);
