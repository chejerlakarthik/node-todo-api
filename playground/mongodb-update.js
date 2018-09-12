const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppDB', {useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Could not connect to MongoDB', err);
    }
    console.log('Connected to MongoDB');
    let db = client.db('TodoAppDB');

    // Update location to include country name
    db.collection('Users').findOneAndUpdate({ _id : new ObjectID("5b96794519c95014e1c29cc5") }, { 
                        $set : {
                            location : 'Sydney, Australia' }
                        }, {
                            returnOriginal : false
                        })
                          .then( (result) => {
                            console.log(result);
                        });

    // Increment the age of Aarthi by 1
    db.collection('Users').findOneAndUpdate({
        _id : new ObjectID("5b968e55717f4b8aa84c4083")
    }, {
        $inc : {
            age : +2
        }
    }, {
        returnOriginal : false
    })
    .then((result) => {
        console.log(result);
    });

    client.close();
});