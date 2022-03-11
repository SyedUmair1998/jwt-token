const express = require('express');
const app = express();
const connecttion = require('./connection');
const userController = require('./controller/user'); 
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const User = require("./model/user");





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


 connecttion();  // making a connection

const userAuth = async(req,res,next) =>
{
  const {authorization} = req.headers;
  if(authorization && authorization.startsWith("Bearer"))
  {
    const token = authorization.split(' ')[1]
    const {user_id} = jwt.verify(token,"mahbir123")
    console.log(user_id);
    const saved_user = await User.findById(user_id);
    console.log(saved_user);
    req.username = saved_user.username;
    next();
  }
  else
  {
    console.log("no authorization")
    next();
  }
  
} 

app.use(userAuth);
 
app.use("/user",userController)
 
app.get("/",(req,res)=>{
  res.send("Default route working")
})

app.listen(3000,()=>{
  console.log("PORT Running at 3000");
})