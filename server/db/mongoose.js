const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localHost:27017/TodoApp');

module.exports = { mongoose };
