const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mobileno: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  followed: {
    type: Array,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', UserSchema);