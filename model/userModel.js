const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('config');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        minLength:3,
        maxLength:20,
        required:true
    },
    email:{
        type:String,
        minLength:6,
        maxLength:20,
        required:true
    },
    password:{
        type:Number,
        required:true
    }
});
userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
const getToken=userSchema.methods.generateToken=function(){
    const token=jwt.sign(
        {
            _id:this._id, 
            username:this.username,
            email:this.email,
            password:this.password,
        }, config.get('jwtPrivateKey'))
        return token;
};
const User=mongoose.model('User',userSchema);
module.exports={User,getToken};