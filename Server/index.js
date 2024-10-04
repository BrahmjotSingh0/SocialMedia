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
    try {
        const user = await UserModel.findOne({ email: email });
        if (user && user.password === password) {
            res.json({ user, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'User not found' });
    }
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        const newUser = await UserModel.create({ email, username, password });
        res.status(201).json({ message: 'Account created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, username, bio, profilePicture, connectionsCount, connectionsUsernames, postsCount, posts } = req.body;
    try {
        const existingUser = await UserModel.findOne({ $or: [{ email: email }, { username: username }], _id: { $ne: id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, { email, username, bio, profilePicture, connectionsCount, connectionsUsernames, postsCount, posts }, { new: true });
        res.json({ user: updatedUser, message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});