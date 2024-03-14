const mongoose = require('mongoose');
const express = require('express');
const User = require('../Day19/DAY19.js'); 
const app = express();
app.use(express.json());

app.get('/average-age', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);

    const averageAge = result.length > 0 ? result[0].averageAge : 0;

    res.json({ averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
