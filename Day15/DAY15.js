const express = require("express");
const app = express();

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
}
app.use(express.json()); 
app.use(loggingMiddleware);

app.get("/", (req, res) => {
  console.log("Day 15");
  res.send("Hello, Day 15!"); 
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
