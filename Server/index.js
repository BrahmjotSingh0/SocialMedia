const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/UserModel');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const Port = process.env.PORT || 3001;

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
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
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
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
        console.error('Error during user update:', err);
        res.status(500).json({ message: 'Server error' });
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
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/posts', async (req, res) => {
  const { title, caption, imageUrl, userId } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const newPost = {
      image: imageUrl,
      likes: 0,
      comments: [],
      title,
      caption,
      createdAt: new Date()
    };
    user.posts.push(newPost);
    user.postsCount += 1;
    await user.save();
    res.status(201).send('Post added');
  } catch (err) {
    res.status(500).send('Error adding post');
  }
});

app.get('/posts', async (req, res) => {
  try {
    const users = await UserModel.find();
    const posts = users.flatMap(user => user.posts.map(post => ({
      ...post.toObject(),
      username: user.username,
      userImage: user.profilePicture,
    })));
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort posts by date
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});