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
    //   .deleteMany({ text: 'Finish jumper' })
    //   .then(res => console.log(res));

    // db.collection('Todos')
    //   .deleteOne({ text: 'Eat chocolate' })
    //   .then(res => console.log(res));

    // db.collection('Todos')
    //   .findOneAndDelete({ completed: false })
    //   .then(res => console.log(res));

    db.collection('User').deleteMany({ name: 'Brooke' });

    db.collection('User').deleteOne({
      _id: new ObjectID('5baceef136f0fa4e18ebf833'),
    });

    // client.close();
  }
);
