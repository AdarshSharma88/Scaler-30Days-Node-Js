const express = require("express");
const app = express();
const connectToMongoDB = require("./connection.js");

app.use(express.json());
connectToMongoDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

