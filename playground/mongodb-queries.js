const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

const id = '5b98b77cf29c5e54e4e363dc';

User.findById(id).then((user) => {
    if(!user){
        return console.log('user not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => {
    console.log('Something went wrong. Check the ID');
});

