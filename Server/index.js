const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/UserModel');

const app = express();
const Port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

mongoose.connect('mongodb+srv://brahmjots111:kYOqvpLzdifdJdIQ@cluster0.vptpd.mongodb.net/users') 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user && user.password === password) {
            res.status(200).json({ user, message: 'Login successful' });
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
        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            email, username, bio, profilePicture, connectionsCount, connectionsUsernames, postsCount, posts
        }, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });
  

app.listen(Port, () => {
    console.log('Server is running on port {Port}');
});