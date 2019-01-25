const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c48d604177d4281b02d17e6'

if (!ObjectID.isValid(id)){
  console.log('ID not valid')
}


Todo.find({                       //WILL FIND ALL OF THEM
  _id: id
}).then((todos)=>{
  console.log(`Todos` , todos);
});

Todo.findOne({                      //WILL FIND THE FIRST ONE
  _id: id
}).then((todo)=>{
  console.log(`Todo: ` , todo);
});


Todo.findById(id).then((todo)=>{              //BY ID

  if(!todo){
    return console.log(`Couldnt find the ID`)
  }

  console.log(`Todo by ID : `, todo);
}).catch( (e)=> console.log('ID not valid'))

//challenge
// QUERY USERS COLLECTION
//LOAD IN USERS models
var userid = '5c47a4263b857a6a2dbe1fa1';
User.find({
  _id: userid
}).then((user)=>{
  console.log(`User: `,user)
})


User.findById(userid).then( (user)=>{
  if(!user) {
    return console.log(`User ID not found`);
  }
  console.log('User: ' , user)
},  (e)=>{
  console.log(e)
})
