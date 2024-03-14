const mongoose = require("mongoose");
const MONGO_URI='mongodb://127.0.0.1/Scaler';
function connectToMongoDB(){
  try{
      const connect = mongoose.connect(MONGO_URI);
      console.log("connect")
      
  }
  catch(error)
  {
      console.log(error);
  }
};
module.exports=connectToMongoDB;