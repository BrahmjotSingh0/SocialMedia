const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  dateConnected: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: String,
    comment: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: 'https://avatar.iran.liara.run/public/47'
  },
  connections: [ConnectionSchema],
  postsCount: {
    type: Number,
    default: 0
  },
  posts: [PostSchema]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;