const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '5bae0d2e0547f3b63fab838b11';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find().then(todos => console.log('Find:', todos)).catch(e => console.log(e));

// Todo.findOne({ _id: id }).then(todo => console.log('FindOne:', todo));

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log(`Can't find todo with id ${id}`);
//     }
//     console.log('FindById:', todo);
//   })
//   .catch(e => console.log(e));

const userId = '5bae16dfc1dc70c1300992a811';

User.findById(userId).then(
  user => {
    if (!user) {
      return console.log(`Can't find user with id ${userId}`);
    }

    console.log('User:', user);
  },
  e => console.log(e)
);
