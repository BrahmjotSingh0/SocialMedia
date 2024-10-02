const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/UserModel');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
}));

mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user && user.password === password) {
                res.json(user);
            } else {
                res.json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => res.json({ message: 'User not found' }));
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    UserModel.create({ email, username, password })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});