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
    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists. Please login.' });
        }
        const newUser = await UserModel.create({ email, username, password });
        res.status(201).json({ message: 'Account created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, username, bio, profilePicture } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { email, username, bio, profilePicture }, { new: true });
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});