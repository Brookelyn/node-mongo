const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localHost:27017/TodoApp'
);

module.exports = { mongoose };
