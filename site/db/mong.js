var mongo = require('mongoose')
var Schema = require('./Schema/users')
var dbc = require('./conf')
mongo.connect(dbc.local,(err,db) =>{ //docker or local
    if(err) throw err;
    });
var user = mongo.model('user',Schema);

function reg(log,pas){
    return new Promise((resolve,reject)=>{
        var lp = new user({
            login:log,
            password:pas
        });
        user.find({login:log},(err,doc)=>{
            if(err) throw err;
            if(doc.length===0){
                lp.save();
                resolve();
            }
            else{reject('Такой пользователь уже есть!')}
        });
    });
}

function sign(log,pas){
    return new Promise((resolve,reject)=>{
        user.find({login:log},(err,doc)=>{
            if(doc.length===0){
                reject('Такого пользователя не существует');
            }
            else if(+doc[0].password === +pas){
                resolve();
            }
            else{
                reject('Неправильный логин или пароль!!!!!');
            }
        });
    });
}
module.exports.reg = reg;
module.exports.sign = sign;
