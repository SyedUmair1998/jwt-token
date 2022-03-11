
const router = require('express').Router();
const User = require("../model/user");
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

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
    const token = jwt.sign({user_id:savedUser._id},"mahbir123",{expiresIn:'5d'})
    res.json({
      savedUser,
      token,
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

router.post("/login",(req,res)=>{
  const loginUser = async() => {
    
    const{email,password} = req.body;
    
    const savedUser = await User.findOne({email});
    if(savedUser.password === password)
    {
      const token = jwt.sign({user_id:savedUser._id},"mahbir123",{expiresIn:'5d'})
      res.json({savedUser,token,name:req.username
      })
      
    }
    else
    {
      res.send("Invalid email or password")
      
    }

  }
  loginUser();
})


module.exports = router;