const mongo = require('mongoose');
var crypto = require('crypto')

//Schema
var Schema = mongo.Schema;
var userSchema = new Schema({
    login:{
    type:String,
    unique:true,
    required: true
    },
    hashedpassword:{
    type:String,
    required: true
    },
    salt:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});
userSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
};
userSchema.virtual('password')
   .set((password)=>{
       this._plainPassword = password;
       this.salt = Math.random()+'';
       this.hashedpassword = this.encryptPassword;
   })
   .get(()=>{return this._plainPassword})

userSchema.methods.checkPassword = (password)=>{
    return this.encryptPassword(password) === this.hashedpassword;
}
exports.cryp = mongo.model('crypt',userSchema);
