const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const express=require('express');
const {User,getToken}=require('../model/userModel');

const signUp= async function(req,res){
    try {
        const {username,email,password}=req.body;
        let found=User.findOne({email:email});
        if(found){
            res.status(404).json({message:'User already exists!'});
        };
        let user= new User();
        user.username=username;
        user.email=email;
        user.password=password;
        await user.save();
        res.status(200).json({message:'User created successfully.'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error!'});
    };
};
const login=async function(req,res){
    try {
    const {username,password}=req.body
    let user= await User.findOne({username:username})
    if(!findUser){
    return res.status(404).send('Invalid username or password')}
    let checkPassword= await bcrypt.compare(password,user.password)
    if(!checkPassword) return res.status(404).send('Invalid username or password')
    const token=getToken();
    console.log('Successfully logged in');
    res.status(200).send(token);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error!'});
    }
};
const deleteUser=async function(req,res){
    try {
        const {username,password}=req.body;
        const user= await User.findOne({username:username});
        if(!user){
            res.status(404).json({message:'The user does not exist!'});
        }
        const result= await User.deleteOne({username:username});
        if(!result){
            res.status(500).json({error:'Could not delete the user!'});
        }
        res.status(200).json({message:'User deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
};
const display=async function(req,res){
    try {
        const users= User.find();
        if(!users){
            res.status(200).json({message:'No users are registered'})
        }
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error!'})
    }
};
module.exports={signUp,login,deleteUser,display};