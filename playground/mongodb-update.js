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
    //   .findOneAndUpdate(
    //     { text: 'Finish jumper' },
    //     { $set: { completed: true } },
    //     { returnOriginal: false }
    //   )
    //   .then(res => console.log(res));

    db.collection('User')
      .findOneAndUpdate(
        { name: 'Ruth' },
        {
          $set: { name: 'Brooke' },
          $inc: { age: 1 },
        },
        { returnOriginal: false }
      )
      .then(res => console.log(res));

    // client.close();
  }
);
