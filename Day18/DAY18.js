const mongoose = require('mongoose');
const connectToMongoDB =  require('../Day16/connection.js')
const express = require("express");
const Users = require('../Day17/DAY17.js');
const app = express();
app.use(express.json());
connectToMongoDB();

const port = 5000;
app.get('/users', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
connectToMongoDB();