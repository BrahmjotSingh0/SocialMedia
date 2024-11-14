const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/UserModel');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://postitup.netlify.app'], // Add your frontend URLs here
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

const Port = process.env.PORT || 3001;

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'https://postitup.netlify.app'];

app.use(cors({
    origin: function (origin, callback) {
        console.log('Origin:', origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error('Blocked by CORS:', origin);
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
            res.status(200).json({ message: 'Login successful', user });
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
            return res.status(409).json({ message: 'Email or username already exists' });
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
    const { email, username, bio, profilePicture, connections, postsCount, posts } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { email, username, bio, profilePicture, connections, postsCount, posts }, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
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
            return res.status(404).json({ message: 'User not found' });
        }
        const newPost = { title, caption, image: imageUrl };
        user.posts.push(newPost);
        user.postsCount += 1;
        await user.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const users = await UserModel.find();
        const posts = users.flatMap(user => 
            user.posts.map(post => ({
                ...post.toObject(),
                username: user.username,
                userImage: user.profilePicture
            }))
        );
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/connect', async (req, res) => {
    const { userId, connectUsername } = req.body;
    try {
        const user = await UserModel.findById(userId);
        const connectUser = await UserModel.findOne({ username: connectUsername });
        if (!user || !connectUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.connections.some(connection => connection.username === connectUsername)) {
            return res.status(400).json({ message: 'Already connected' });
        }
        user.connections.push({ username: connectUsername });
        connectUser.connections.push({ username: user.username });
        await user.save();
        await connectUser.save();
        res.status(200).json({ message: 'Connection successful' });
    } catch (err) {
        console.error('Error connecting users:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/remove-connection', async (req, res) => {
    const { userId, connectUsername } = req.body;
    try {
        const user = await UserModel.findById(userId);
        const connectUser = await UserModel.findOne({ username: connectUsername });
        if (!user || !connectUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.connections = user.connections.filter(connection => connection.username !== connectUsername);
        connectUser.connections = connectUser.connections.filter(connection => connection.username !== user.username);
        await user.save();
        await connectUser.save();
        res.status(200).json({ message: 'Connection removed successfully' });
    } catch (err) {
        console.error('Error removing connection:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/chats', async (req, res) => {
    const { username } = req.query;
    console.log('Fetching chats for user:', username); // Log username
    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const chats = user.chats.map(chat => {
            const otherUser = chat.participants.find(participant => participant !== username);
            return {
                ...chat.toObject(),
                otherUser
            };
        });
        res.status(200).json(chats);
    } catch (err) {
        console.error('Error fetching chats:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/chats/:username', async (req, res) => {
    const { username } = req.params;
    const { userUsername } = req.query; // Changed from userId to userUsername
    console.log('Fetching chat for user:', userUsername, 'with:', username); // Log userUsername and username
    try {
        const user = await UserModel.findOne({ username: userUsername });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const chat = user.chats.find(chat => chat.participants.includes(username));
        res.status(200).json(chat ? chat.messages : []);
    } catch (err) {
        console.error('Error fetching messages:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/chats', async (req, res) => {
    const { senderUsername, receiverUsername, message } = req.body; // Changed from senderId to senderUsername
    console.log('Sending message from:', senderUsername, 'to:', receiverUsername, 'message:', message); // Log message details
    try {
        const sender = await UserModel.findOne({ username: senderUsername });
        const receiver = await UserModel.findOne({ username: receiverUsername });
        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        let senderChat = sender.chats.find(chat => chat.participants.includes(receiverUsername));
        let receiverChat = receiver.chats.find(chat => chat.participants.includes(senderUsername));

        if (!senderChat) {
            senderChat = { participants: [senderUsername, receiverUsername], messages: [] };
            sender.chats.push(senderChat);
        }

        if (!receiverChat) {
            receiverChat = { participants: [senderUsername, receiverUsername], messages: [] };
            receiver.chats.push(receiverChat);
        }

        const newMessage = { sender: senderUsername, message, createdAt: new Date() };
        senderChat.messages.push(newMessage);
        receiverChat.messages.push(newMessage);

        await sender.save();
        await receiver.save();

        console.log('Message sent:', newMessage); // Log sent message
        io.to(receiverUsername).emit('receiveMessage', newMessage);
        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Error sending message:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async ({ senderUsername, receiverUsername, message }) => {
        try {
            const sender = await UserModel.findOne({ username: senderUsername });
            const receiver = await UserModel.findOne({ username: receiverUsername });

            if (!sender || !receiver) {
                socket.emit('error', 'User not found');
                return;
            }

            let senderChat = sender.chats.find(chat => chat.participants.includes(receiverUsername));
            let receiverChat = receiver.chats.find(chat => chat.participants.includes(senderUsername));

            if (!senderChat) {
                senderChat = { participants: [senderUsername, receiverUsername], messages: [] };
                sender.chats.push(senderChat);
            }

            if (!receiverChat) {
                receiverChat = { participants: [senderUsername, receiverUsername], messages: [] };
                receiver.chats.push(receiverChat);
            }

            const newMessage = { sender: senderUsername, message, createdAt: new Date() };
            senderChat.messages.push(newMessage);
            receiverChat.messages.push(newMessage);

            await sender.save();
            await receiver.save();

            io.to(receiverUsername).emit('receiveMessage', newMessage);
            socket.emit('messageSent', newMessage);
        } catch (err) {
            socket.emit('error', 'Error sending message');
        }
    });

    socket.on('join', (username) => {
        socket.join(username);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});