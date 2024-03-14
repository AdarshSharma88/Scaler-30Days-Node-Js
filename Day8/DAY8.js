const express = require('express');
const app = express();
const port = 3000;
function errorHandler(err, req, res, next) {
  if (err.name === 'PositiveIntegerError') {
    res.status(400).json({ error: 'Invalid parameter: "number" must be a positive integer.' });
  } else {
    
    next(err);
  }
}
function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (!isNaN(number) && number > 0) {
    res.status(200).send(`Success! Positive integer received.`)
 
  } else {
    throw new Error("Invalid parameter:Number must be a positive integer")
  }
}

class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositiveIntegerError';
  }
}

app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
