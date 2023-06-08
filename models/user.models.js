const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  disabilityType: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a compound index on firstName, lastName, and email
userSchema.index({ firstName: 1, lastName: 1, email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
