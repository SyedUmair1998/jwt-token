
const router = require('express').Router();
const User = require("../model/user");
const {check,validationResult} = require('express-validator');

router.get("/",(req,res)=>{
  res.send("User default route working");
  
});


router.post("/create",
[
  check('username').not().isEmpty().trim().escape(),
  check('password').not().isEmpty().trim().escape(),
  check('email').isEmail().normalizeEmail()
],
(req,res)=>{
  
  const registerUser = async() => {
    
  const checkErrors = validationResult(req);
  if(!checkErrors.isEmpty())
  {
    return res.json({Errors:checkErrors})
    
  }
 else 
 {
   const{username,email,password} = req.body;
   const user1 = new User({
     username,
     password,
     email
   })
   
   try
   {
    const savedUser = await user1.save();
    res.json({
      savedUser
    });
     
   }
   catch(error)
   {
     res.json({error})
   }
   
 }
    
  }
  registerUser();
  
  
})


module.exports = router;