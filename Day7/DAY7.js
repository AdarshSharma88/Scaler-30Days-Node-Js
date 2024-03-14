const express = require("express");
const app = express();
const PORT=3000;
function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    next();
  }
  app.use(requestLoggerMiddleware);
  app.get("/",(req,res)=>{
    console.log("GET REQUEST");
  })
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });