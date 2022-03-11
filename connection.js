const mongoose = require('mongoose');



const connect_mydb = async() =>{
  
  try
  {
    const result = await mongoose.connect("mongodb://localhost:27017/apply_jwt");
    console.log("Connection successfull")
  }
  catch(error){
    console.log("Error occurred");
  }
}

module.exports = connect_mydb;