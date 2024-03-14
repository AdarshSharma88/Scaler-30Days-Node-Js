const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server working on ${PORT}`);
});
app.get('/greet', greetHandler);

function greetHandler(req, res) {
  const name = req.query.name;
  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send('Hello, Guest!');
  }
}
