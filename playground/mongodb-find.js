const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localHost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log("Oh, there's been an error");
    }

    console.log('Connected to mongo db server');

    const db = client.db('TodoApp');

    // db.collection('Todos')
    //   .find({ completed: false })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log('Todos');
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     err => console.log('Error:', err)
    //   );

    // db.collection('Todos')
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log(`Todos count: ${count}`);
    //     },
    //     err => console.log('Error:', err)
    //   );

    db.collection('User')
      .find({ name: 'Ruth' })
      .toArray()
      .then(
        docs => {
          console.log('Users named Ruth');
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => console.log('Error:', err)
      );

    // client.close();
  }
);
