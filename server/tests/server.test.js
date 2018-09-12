const expect = require('expect');
const mocha = require('mocha');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const initialTodos = [{
    item : 'First todo item'
}, {
    item : 'Second todo item'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(initialTodos);
        done();
    });
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        let item = 'Sample to-do';

        request(app)
            .post('/todos')
            .send({item})
            .expect(201)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                
                // check 1 record created in database
                Todo.find({item}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].item).toBe(item);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create a new todo for bad request', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err);
                }
                
                // check no record created in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should return list of all todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});