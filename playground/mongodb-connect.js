const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoAppDB', {useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Could not connect to MongoDB', err);
    }
    console.log('Connected to MongoDB');
    
    let db = client.db('TodoAppDB');
    
    db.collection('Todos').insertOne({ 
        item: 'Wash your clothes', 
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Something went wrong..', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        firstName: 'Karthik',
        lastName: 'Chejerla',
        age: 29,
        location: 'Sydney'
    }, (err, result) => {
        if(err){
            return console.log('Something went wrong..', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});