fs = require('fs');
fs.readFile('test',function(err,log){
  if(err) throw err;
  var text = log.toString();
  console.log(text);
})
}
