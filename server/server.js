const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

// Middleware fn to convert request body to json format
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        item : req.body.item
    });
    
    todo.save().then((document) => {
        res.status(201).send(document);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.status(200)
           .send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req,res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    let user = new User({
        email : req.body.email
    });

    user.save().then( (document) => {
        res.status(201).send(document);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

module.exports = {
    app
}
