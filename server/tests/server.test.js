const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    text: 'First test todo',
    _id: new ObjectID(),
  },
  {
    text: 'Second test todo',
    _id: new ObjectID(),
  },
];

describe('server', () => {
  describe('POST /todos', () => {
    beforeEach(done => {
      Todo.remove({}).then(() => done());
    });

    it('should create a new todo', done => {
      const text = 'Stringy McStringface';

      request(app)
        .post('/todos')
        .send({
          text,
        })
        .expect(200)
        .expect(res => expect(res.body.text).toBe(text))
        .end((e, res) => {
          if (e) {
            return done(e);
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            })
            .catch(e => done(e));
        });
    });

    it('should not create a todo with invalid body data', done => {
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((e, res) => {
          if (e) {
            return done(e);
          }

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(0);
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe('GET /todos', () => {
    beforeEach(done => {
      Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
    });

    it('should return a list of all the todos', done => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });

    it('should return a todo by ID', done => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todo.text).toBe('First test todo');
        })
        .end(done);
    });

    it('should return a 404 if no todo matches the id', done => {
      var hexId = new ObjectID().toHexString();

      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 if the id is not valid', done => {
      request(app)
        .get('/todo/123')
        .expect(404)
        .end(done);
    });
  });
});
