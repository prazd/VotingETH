const mongo = require('mongoose');
//Schema
var Schema = mongo.Schema;
var userSchema = new Schema({
    login:String,
    password:String
});

module.exports = userSchema;
