const express=require('express');
const app=express();
const config=require('config');
const dotenv=require('dotenv');
const port=4500;
const bodyParser=require('body-parser');
dotenv.config({path:'./.env'});
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

if(!config.get("jwtPrivateKey")){
    console.log('The jwt private key is needed.')
    process.exit(1);
};

require('./config/db');

app.listen(port,()=>{
    console.log(`server running on port ${port}....`);
});

const router=require('./routes/userRoutes');
app.use(router);

app.get('/',(req,res)=>{res.send('Welcome to our system!')});