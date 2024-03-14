const mongoose = require('mongoose');
const connectToMongoDB =  require('../Day16/connection.js')
const express = require("express");
const app = express();
app.use(express.json());
connectToMongoDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
connectToMongoDB();
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

function addUserToDatabase(user) {
  const newUser = new User({
    username: user.username,
    email: user.email
  });
  newUser.save()
    .then(() => {
      console.log('User added successfully');
    })
    .catch((error) => {
      console.error('Error adding user:', error.message);
    });
}
module.exports = User;
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
