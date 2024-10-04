const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  image: String,
  likes: Number,
  comments: [{
    user: String,
    comment: String
  }]
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
    default: ''
  },
  connectionsCount: {
    type: Number,
    default: 0
  },
  connectionsUsernames: {
    type: [String],
    default: []
  },
  postsCount: {
    type: Number,
    default: 0
  },
  posts: [PostSchema]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;