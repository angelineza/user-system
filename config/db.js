const mongoose=require('mongoose');
const url='mongodb://127.0.0.1:27017/User-system';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>{console.log('Connected to the database successfully')})
    .catch((err)=>{console.log(err)});
require('../model/userModel');