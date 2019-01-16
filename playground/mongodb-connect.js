
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
 if(err){
   return console.log("Unable to connect to server");
 }

 console.log("Connected to mongodb server");
 const db = client.db('TodoApp');

  db.collection('Todos').insertOne({
    text:'Clean room',
    completed: false
  }, (err,result)=>{
    if(err){
      return console.log(`Unable to insert todo` , err)
    }

    console.log(JSON.stringify(result.ops , undefined, 2));
//end of collection call
  });

//Insert new doc into Users Collecton
//name, age , location


// db.collection('Users').insertOne({
//   name:'Danny',
//   age: 27,
//   location: "New Jersey"
// }, (err, result)=>{
//   if(err){
//     return console.log(`Unable to add to database`, err);
//   }
// console.log(JSON.stringify(result.ops , undefined, 2));
//
// console.log(result.ops[0]._id.getTimestamp());
// })



client.close();
  //end of program
});
