const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

console.log(obj);

MongoClient.connect(
  'mongodb://localHost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log("Oh, there's been an error");
    }

    console.log('Connected to mongo db server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Finish jumper',
    //     completed: false,
    //   },
    //   (err, res) => {
    //     if (err) {
    //       return console.log('Error:', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    //   }
    // );

    db.collection('User').insertOne(
      {
        name: 'Tris',
        age: 37,
        location: 'Southampton',
      },
      (err, res) => {
        if (err) {
          return console.log('Error:', err);
        }

        console.log(res.ops[0]._id.getTimestamp());
      }
    );

    client.close();
  }
);
