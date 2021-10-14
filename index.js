const express = require ('express');
const bodyparser = require ('body-parser') 
const cookieparser = require ('cookieparser') 
const router=require('./routers/user.router'); //Require route path 





const app = express (); 

app.use (bodyparser.json());

app.get('/',(req, res) => res.send('Notes App'));  


app.use('/api/v1', router);

const db = require("./models/db.model");

app.listen(8080,()=>{
    console.log("server is runing on port 8080");
}) 