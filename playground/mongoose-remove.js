const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}) this will remove everything
  // Todo.remove({}).then( (result)=>{
  //   console.log(result)
  // })

// Todo.findOneAndRemove({
//   //will remove the first one that it removes, also returns it
//
// })

// Todo.findOneAndRemove({_id: "5c4b51a98ad40fa853604cc2"}).then( (todo)=>{
//   console.log(todo)
// })
//

Todo.findByIdAndRemove('5c4b51b48ad40fa853604cc4').then( (todo)=>{
  console.log(todo);
})
