
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
 if(err){
   return console.log("Unable to connect to server");
 }
 const db = client.db('TodoApp');

 console.log("Connected to mongodb server");

// db.collection('Todos').find().count().then( (count)=>{
//   console.log(`Todos`);
//   // console.log(JSON.stringify(docs, undefined , 2))
//   console.log(`Count is ${count} `);
//
// }, (err) => console.log(`Unable to fetch todos`))

db.collection('USERS').find({name:"Mike"}).toArray().then( (docs)=>{
  // console.log(`Users ` , docs);
  console.log(JSON.stringify(docs, undefined , 2))
}, (err) => console.log(`Unable to fetch users`))



client.close();
  //end of program
});
