const express=require('express');
const app=express.Router();
const {signUp,login,deleteUser,display}=require('../controllers/userControllers');

app.post('/login',login);
app.post('/signup',signUp);
app.get('/allusers',display);
app.delete('/delete',deleteUser);

module.exports=app;