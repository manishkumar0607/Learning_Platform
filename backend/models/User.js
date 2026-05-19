const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [30, 'Name too long (max 30 chars)']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);