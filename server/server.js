const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(doc => res.send(doc), e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => res.send({ todos }), e => res.status(400).send(e));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then(
    todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({ todo });
    },
    e => res.status(400).send(e)
  );
});

app.post('/users', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  user.save().then(doc => res.send(doc), e => console.log(e));
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.status(200).send(todo);
    })
    .catch(e => res.status(400).send(e));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
