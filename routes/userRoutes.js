const express=require('express');
const app=express.Router();
const {signUp,login,deleteUser,display,updateUser}=require('../controllers/userControllers');

app.post('/login',login);
app.post('/signup',signUp);
app.put('/update/:username',updateUser);
app.get('/allusers',display);
app.delete('/delete',deleteUser);

module.exports=app;