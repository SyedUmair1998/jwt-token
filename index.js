const express = require('express');
const app = express();
const connecttion = require('./connection');
const userController = require('./controller/user'); 
var bodyParser = require('body-parser')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


 connecttion();  // making a connection

app.use("/user",userController)
 
app.get("/",(req,res)=>{
  res.send("Default route working")
})

app.listen(3000,()=>{
  console.log("PORT Running at 3000");
})