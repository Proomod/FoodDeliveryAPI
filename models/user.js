const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  userName: String,
  email: {type: String, unique: true},
  password: {type: String, select: false},
  // token: {type: [String], default: null},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
