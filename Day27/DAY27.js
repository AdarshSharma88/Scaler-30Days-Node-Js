const express = require('express');
const app = express();
const authenticateAndAuthorize = require('./middleware');
app.get('/admin/dashboard', authenticateAndAuthorize('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});
app.get('/user/profile', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'Welcome to your user profile' });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
