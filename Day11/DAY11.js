const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const PORT = 3000;
const JWT_SECRET= 'fesfeafejhsscbfsfeafefrhyjyl';

function authenticateToken(req,res,next){
    
    const token = req.headers.authenthorization;
    if(!token) return res.status(401).json({message:
    "Unauthorize"});

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err) {return res.status(401).json({message:"Unauthorize"});}
        else{
        req.user = user;
        next();
        }
    });
}
const protected = (req,res)=>{
    res.status(200).json({message:"User Authorize",user})
};
app.get('/protected',authenticateToken,protected);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
