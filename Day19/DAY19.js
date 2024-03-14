const mongoose = require('mongoose');
const connectToMongoDB = require('../Day16/connection.js');
const express = require('express');
const app = express();
app.use(express.json());
connectToMongoDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
connectToMongoDB();

// Define user schema with email validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age:{
    type:Number,
    required:true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      
      message: 'Invalid email format',
    },
  },
});

const User = mongoose.model('User', userSchema);

// Function to add a new user to the MongoDB database with validation
function addUserWithValidation(user) {
  // Create a new user instance using the model constructor and the provided user object
  const newUser = new User({
    username: user.username,
    email: user.email,
    age:user.age,
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
addUserWithValidation({ username: 'john_doe', email: 'invalid-email',age:23 });
addUserWithValidation({ username: 'john_doe', email: 'john@example.com',age:23 });
