const express = require('express');4
const app = express();
const PORT = 3000;
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 5, 
	message:"Too many requests from this IP, Please tyy again later"
})
app.use(limiter);
app.get('/',limiter,(req,res)=>{
    res.status(200).json({
        status:"true",
        message:"You can access"
    });
});

app.use(limiter)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

