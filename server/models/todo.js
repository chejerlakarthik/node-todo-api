const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    item : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    completed : {
        type : Boolean,
        default: false
    },
    completedAt : {
        type : Date,
        default : null
    }
});

module.exports = {
    Todo
}