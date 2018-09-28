const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = '5bae0d2e0547f3b63fab838b11';

// Todo.remove({}).then(res => console.log(res));

Todo.findByIdAndRemove('5bae3ed78b6d4dd9e92622e8').then(res =>
  console.log(res)
);
