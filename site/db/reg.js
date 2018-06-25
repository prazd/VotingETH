const mong = require('mongoose')
const dbc = require('./conf')
const Schema = require('./Schema/users')
mong.connect(dbc.local,(err,db)=>{
	if(err) throw err;
});
function find(log,pas){
	var user = mong.model('user',Schema);
	var lp = new user({
		login:log,
		password:pas
	});
	function test(user){
		var lol = 123;
     	var check =  user.find({},(err,result)=>{
			if(err) throw err;
			lol = result;
		});
		return lol;
	};
	var kek = test(user);
	console.log(kek)
};
module.exports.find = find;
