const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    text: 'First test todo',
  },
  { text: 'Second test todo' },
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
        .end(done;
    });
  });
});
