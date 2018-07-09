var mongo = require('mongoose')
var Schema = require('./Schema/users')
var dbc = require('./conf')
mongo.connect(dbc.local,(err,db) =>{
    if(err) throw err;
    });
var user = mongo.model('user',Schema);

async function reg(log,pas) {
    var lp = new user({
        login:log,
        password:pas
    });
    return await user.find({login:log},(err,doc)=>{
        if(err) throw err;
        if(doc.length===0){
            lp.save()
        }
    })
    ;}

async function sign(log,pas){
    return await user.find({login:log},(err,doc) =>{
		if(err) throw err;
}
)}
module.exports.reg = reg;
module.exports.sign = sign;
