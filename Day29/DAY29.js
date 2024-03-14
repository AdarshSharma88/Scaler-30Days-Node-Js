const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./error.js');
const connectToMongoDB = require('../Day16/connection.js');

const app = express();
connectToMongoDB();
app.use(bodyParser.json());
app.get('/api/sample', (req, res, next) => {
    const error = new Error('Sample Route Error');
    error.status = 500;
    next(error);
});
app.post('/api/user', validateUser, (req, res) => {
    const error = new Error('User Validation Error');
    error.name = 'ValidationError';
    error.status = 422;
    throw error;
});
function validateUser(req, res, next) {
    const isValid = false;

    if (!isValid) {
        const error = new Error('Invalid User Data');
        error.name = 'ValidationError';
        error.status = 422;
        return next(error);
    }

    next();
}
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
