
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
 if(err){
   return console.log("Unable to connect to server");
 }
 const db = client.db('TodoApp');

 console.log("Connected to mongodb server");

// db.collection('Todos').find({_id}).toArray().then( (docs)=>{
//   console.log(`Todos`);
//   console.log(JSON.stringify(docs, undefined , 2))
// }, (err) => console.log(`Unable to fetch todos`))

db.collection('Users').find({name:"Danny"}).toArray().then( (docs)=>{
  // console.log(`Users ` , docs);
  console.log(JSON.stringify(docs, undefined , 2))
}, (err) => console.log(`Unable to fetch todos`))


client.close();
  //end of program
});
