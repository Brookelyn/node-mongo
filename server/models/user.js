const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    minLength: 1,
  },
});

module.exports = { User };
