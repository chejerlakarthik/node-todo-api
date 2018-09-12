const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAppDB', { useNewUrlParser: true }, (err,client) => {
    if(err){
        return console.log('Could not connect to DB', err);
    }

    console.log('Connected to MongoDB');

    let db = client.db('TodoAppDB');

    //deleteMany
    db.collection('Todos').deleteMany({ item : 'Wash your clothes' })
                          .then((result) => {
                              console.log(`Deleted ${result.result.n} todos`);
                          });

    //deleteOne
    //deleteMany
    db.collection('Todos').deleteOne({ item : 'Call wife' })
                          .then((result) => {
                              console.log(`Deleted ${result.result.n} todos`);
                          });
    
    db.collection('Todos').findOneAndDelete({ _id : new ObjectID("5b98a33d717f4b8aa84c4279") }).then((result) => {
        console.log(result);
    });

    //findOneAndDelete
    client.close();
});


