// Object destructuring syntax ES 6 for imports
// Equivalent to: const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppDB', {useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Could not connect to MongoDB', err);
    }
    console.log('Connected to MongoDB');
    
    let db = client.db('TodoAppDB');

    db.collection('Users').find({firstName: 'Karthik'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));

        console.log('Created : ', docs[0]._id.getTimestamp())
    }, (err) => {
        console.log(err);
    });

    db.collection('Users').find().count().then((count) => {
        console.log(`# of users : ${count}`);
    }, (err) => {
        console.log(err);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`# of to-dos : ${count}`);
    }, (err) => {
        console.log(err);
    });

    client.close();
});

// Generating object Ids using ObjectId
console.log('New Object Id is ' , new ObjectID());