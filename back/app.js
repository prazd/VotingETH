let http = require('http'),
let fs = require('fs');

http.createServer(function(request, response){
  fs.readFile('index.html', {encoding: 'utf8'}, function(error, file){
    if(!error){
      response.writeHead(200, {'Content-Type':'text/html'});
      response.write(file);
      response.end();
    }
  });
}).listen(80);
